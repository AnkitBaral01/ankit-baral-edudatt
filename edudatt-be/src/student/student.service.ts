import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateStudentDto, SearchStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectModel } from '@nestjs/mongoose';
import { StudentDocument } from './entities/student.entity';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class StudentService {

	constructor(
		@InjectModel('Student') private readonly studentModel: Model<StudentDocument>,
		private userService: UserService
	) { }


	async create(createStudentDto: CreateStudentDto) {
		
		const student = new this.studentModel(createStudentDto);
		
		await student.save();
		
	}

	async findStudent(searchStudentDto: SearchStudentDto, user: any) {

		// 
		const dbQuery = {
			first_name: searchStudentDto.first_name,
			last_name: searchStudentDto.last_name,
			// date_of_birth: searchStudentDto.date_of_birth,
			school: searchStudentDto.school,
			class: searchStudentDto.class
		};

		const student = await this.studentModel.findOne(dbQuery).exec();

		if (student) {
			// map student
			await this.mapStudent(student.id, user);

			return student;
		}


		return null;
		
	}

	async mapStudent(studentId: string, user: any) {

		// update this student id to the parent.student array

		const student = await this.studentModel.findOne({ _id: studentId }).exec();

		if (!student) {
			throw new BadRequestException('Student not found');
		}

		await this.userService.updateStudent(student, user);

	}

	async getStudentById(id: string, user: any) {

		const student = await this.studentModel.findOne({ _id: id }).exec();

		return student;
		
	}

	/*
	update(id: number, updateStudentDto: UpdateStudentDto) {
		return `This action updates a #${id} student`;
	}

	remove(id: number) {
		return `This action removes a #${id} student`;
	} */
}
