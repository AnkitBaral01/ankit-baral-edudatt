import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { ResetPasswordDto, UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { User, UserDocument } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Student } from 'src/student/entities/student.entity';
import { MailService } from 'src/mail/mail.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {

	constructor(
		@InjectModel('users') private readonly userModel: Model<UserDocument>,
		private readonly mailService: MailService
	) { }

	async create(createUserDto: CreateUserDto): Promise<User> {
		
		const existing = await this.userModel.findOne({ email: createUserDto.email });

		if (existing) { 
			throw new Error('User already exists');
		}

		if (createUserDto.password !== createUserDto.confirm_password) {
			throw new Error('Passwords do not match');
		}

		const user = new this.userModel();
		user.first_name = createUserDto.first_name;
		user.last_name = createUserDto.last_name;
		user.email = (createUserDto.email).toLowerCase();
		user.mobile_number = createUserDto.mobile_number;
		user.email_verified_at= new Date();
		if (createUserDto.fcm_token) {
			user.fcm_tokens = [createUserDto.fcm_token];
		}

		const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
		user.password = hashedPassword;

		const newUser = await user.save();

		if (process.env.NODE_ENV === 'development') {
			// send verification mail
			const token = await this.sendVerificationMail(newUser);
			newUser.verification_token = token;
		} else {
			this.sendVerificationMail(newUser);
		}

		return newUser;

	}

	async findOneByEmail(email: string): Promise<User> {
		
		const user = await this.userModel.findOne({email: (email).toLowerCase()});

		return user;
		
	}

	async findStudents(user: any) {
		
		const userData = await this.userModel.findOne({ _id: user.sub }).populate('students').exec();

		return userData.students;

	}

	async findOne(id: ObjectId | string) {

		const user = await this.userModel.findOne({_id: id}).select('-password -createdAt -updatedAt -students -is_disabled -__v').exec();

		return user;
	}

	async updateStudent(student: Student, user: any) {
		
		const userData = await this.userModel.findOne({_id: user.sub}).exec();

		if (userData.students) {

			if (userData.students.indexOf(student._id) !== -1) { 
				console.log('Student already exists');
			} else {
				userData.students.push(student._id);
			}

		} else {
			userData.students = [student._id];
		}

		await userData.save();

	}


	async updateFcmToken(user: any, fcmToken: string) { 

		if (fcmToken.length == 0) {
			return;
		}

		await this.userModel.updateOne({ _id: user.sub }, { $push: { fcm_tokens: fcmToken } });

	}


	async validateUser(token: string) { 

		try {

			const decoded: any = jwt.verify(token, process.env.JWT_VERIFICATION_TOKEN);

			let email: string = '';
			if (decoded.hasOwnProperty('email')) { 
				email = (decoded.email).toLowerCase();
			}

			const user = await this.userModel.findOne({ email: email }).exec();

			if (user) {
				user.email_verified_at = new Date();
				await user.save();
			}

			const username = user.first_name + ' ' + user.last_name;

			const htmlFileName = 'welcome.html';

			const templateData = await this.mailService.renderTemplate(htmlFileName, { username });
			
			this.mailService.sendMail(user.email, 'Welcome EduDatt', templateData);

		} catch (err) {
			
			console.error('Error in verifying email', err);

			throw new BadRequestException('Invalid token');
		}

	}


	private async sendVerificationMail(user: User) { 

		try {

			// get the verification token
			const jwtTooken = jwt.sign({ email: (user.email.toLowerCase()) }, process.env.JWT_VERIFICATION_TOKEN, { expiresIn: '3d' });

			const verificationLink = `${process.env.FE_BASE_URL}/verify/${jwtTooken}`;

			const htmlFileName = 'accountVerification.html';

			const templateData = await this.mailService.renderTemplate(htmlFileName, { verificationLink });

			this.mailService.sendMail(user.email, 'Account Verification', templateData);
			
			return verificationLink;

		} catch (err) {
			console.error('Error in sending verification', err);
		}

	}

	async updatePassword(user: any, updatePasswordDto: any) { 

		const userData = await this.userModel.findOne({ _id: user.sub }).exec();

		const isMatch = await bcrypt.compare(updatePasswordDto.old_password, userData.password);

		if (!isMatch) {
			throw new BadRequestException('Invalid old password');
		}

		if (updatePasswordDto.new_password !== updatePasswordDto.confirm_password) {
			throw new BadRequestException('Passwords do not match');
		}

		const hashedPassword = await bcrypt.hash(updatePasswordDto.new_password, 10);

		userData.password = hashedPassword;

		await userData.save();

	}

	async forgotPassword(forgotPasswordDto: any) { 

		const user = await this.userModel.findOne({ email: forgotPasswordDto.email }).exec();

		if(!user) {
			throw new BadRequestException('User not found');
		}

		if(user.email_verified_at === null) {
			throw new BadRequestException('Email not verified');
		}

		const verifyToken = jwt.sign({ email: user.email }, process.env.JWT_VERIFICATION_TOKEN, { expiresIn: '3d' });

		const verificationLink = `${process.env.FE_BASE_URL}/reset-password/${verifyToken}`;

		const htmlFileName = 'forgotPassword.html';

		const templateData = await this.mailService.renderTemplate(htmlFileName, { verificationLink });

		this.mailService.sendMail(user.email, 'Reset Password', templateData);

		if (process.env.NODE_ENV === 'development') {
			return verificationLink;
		}

	}

	async resetPassword(resetPasswordDto: ResetPasswordDto) {
		
		const decoded: any = jwt.verify(resetPasswordDto.verification_token, process.env.JWT_VERIFICATION_TOKEN);

		const user = await this.userModel.findOne({ email: decoded.email }).exec();

		if (!user) {
			throw new BadRequestException('Invalid token');
		}

		if (resetPasswordDto.new_password !== resetPasswordDto.confirm_password) {
			throw new BadRequestException('Passwords do not match');
		}

		const hashedPassword = await bcrypt.hash(resetPasswordDto.new_password, 10);

		user.password = hashedPassword;

		await user.save();

	}

	/* update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`;
	}

	remove(id: number) {
		return `This action removes a #${id} user`;
	} */
}
