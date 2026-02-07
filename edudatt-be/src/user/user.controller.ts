import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, BadRequestException, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateFCMTokenDto } from './dto/create-user.dto';
import { ForgotPasswordDto, ResetPasswordDto, UpdatePasswordDto, UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/accessToken.guard';

@ApiTags('user')
@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) { }

	@Post()
	async create(@Body() createUserDto: CreateUserDto, @Res() res) {

		try {

			const user = await this.userService.create(createUserDto);

			let data;
			if (process.env.NODE_ENV === 'development') { 
				// send verification mail
				 data = {token :user.verification_token}
			}

			return res.status(HttpStatus.OK).json({ success: true, message: 'Registered successfully! Please verify your account via clicking the link sent to your email.', ...data });

		} catch (err) {

			if (err instanceof BadRequestException) {
				return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: err.message })
			}

			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: err.message });

		}

	}


	@UseGuards(AccessTokenGuard)
	@Get('students')
	async getStudents(@Req() req, @Res() res) {
		try {

			const students = await this.userService.findStudents(req.user);

			return res.status(HttpStatus.OK).json({
				success: true,
				message: 'Students',
				data: students
			});

		} catch (err) {
			console.log(err);

			if (err instanceof BadRequestException) {
				return res.status(HttpStatus.BAD_REQUEST).json({success: false, message: err.message })
			}

			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: err.message });			

		}
	}

	@UseGuards(AccessTokenGuard)
	@Get()
	async getUser(@Req() req, @Res() res) {
		
		try {
			
			const user = await this.userService.findOne(req.user.sub);

			const students = await this.userService.findStudents(req.user);

			return res.status(HttpStatus.OK).json({
				success: true,
				message: 'User Details',
				data: {
					user,
					students
				}
			});

		} catch (err) {
	
			if (err instanceof BadRequestException) {
				return res.status(HttpStatus.BAD_REQUEST).json({success: false, message: err.message })
			}

			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success: false, message: err.message });

		}

	}

	@UseGuards(AccessTokenGuard)
	@Patch('fcm-token')
	async updateFcmToken(@Req() req, @Body() body: UpdateFCMTokenDto, @Res() res) {
		
		try {

			await this.userService.updateFcmToken(req.user, body.fcm_token);

			return res.status(HttpStatus.OK).json({
				success: true,
				message: 'FCM Token updated successfully'
			});

		} catch (err) {

			if (err instanceof BadRequestException) {
				return res.status(HttpStatus.BAD_REQUEST).json({success: false, message: err.message })
			}

			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success: false, message: err.message });

		}
		
	}

	@Get('verify/:token')
	async verifyEmail(@Param('token') token: string, @Res() res) {

		try {
			
			await this.userService.validateUser(token);

			return res.status(HttpStatus.OK).json({
				success: true,
				message: 'Email verified successfully!'
			});

		} catch (err) {
			
			if(err instanceof BadRequestException) {
				return res.status(HttpStatus.BAD_REQUEST).json({success: false, message: err.message })
			}

			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: err.message });
			
		}


	}

	@UseGuards(AccessTokenGuard)
	@Patch('update-password')
	async updatePassword(@Body() body: UpdatePasswordDto, @Req() req, @Res() res) {

		try {

			await this.userService.updatePassword(req.user, body);

			return res.status(HttpStatus.OK).json({
				success: true,
				message: 'Password updated successfully!'
			});

		} catch (err) {
			
			if(err instanceof BadRequestException) {
				return res.status(HttpStatus.BAD_REQUEST).json({success: false, message: err.message })
			}

			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: err.message });

		}
		
	}

	@Post('forgot-password')
	async forgotPassword(@Body() updateUserDto: ForgotPasswordDto, @Req() req, @Res() res) { 

		try {

			const verification = await this.userService.forgotPassword(updateUserDto);

			let data;
			if (process.env.NODE_ENV === 'development') { 
				// send verification mail
				data = { token: verification }
			}

			return res.status(HttpStatus.OK).json({
				success: true,
				message: 'Password reset link sent to your email!',
				...data
			});

		} catch (err) {

			if(err instanceof BadRequestException) {
				return res.status(HttpStatus.BAD_REQUEST).json({success: false, message: err.message })
			}

			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: err.message });

		}

	}

	@Patch('reset-password')
	async resetPassword(@Body() body: ResetPasswordDto, @Res() res) {

		try {

			await this.userService.resetPassword(body);

			return res.status(HttpStatus.OK).json({
				success: true,
				message: 'Password updated successfully!'
			});

		} catch (err) {

			if(err instanceof BadRequestException) {
				return res.status(HttpStatus.BAD_REQUEST).json({success: false, message: err.message })
			}

			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: err.message });

		}

	}



	/* @Get()
	@UseGuards(AccessTokenGuard)
	findAll() {
		return this.userService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.userService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(+id, updateUserDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.userService.remove(+id);
	} */
}
