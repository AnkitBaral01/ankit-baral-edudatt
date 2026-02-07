import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, Req, HttpStatus, BadRequestException } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto, SearchStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { AccessTokenGuard } from 'src/common/accessToken.guard';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';

@UseGuards(AccessTokenGuard)
@ApiTags('student')
@Controller('student')
export class StudentController {
	constructor(
		private readonly studentService: StudentService
	) { }

	@Post('create')
	async create(@Body() createStudentDto: CreateStudentDto, @Res() res, @Req() req) {

		try {
		
			await this.studentService.create(createStudentDto);
			
			return res.status(HttpStatus.OK).json({success: true, message: 'Student added'});

		} catch (err) {
			console.log(err);

			if (err instanceof BadRequestException) {
				return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: err.message })
			}

			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: err.message });			

		}

	}

	@Post('search')
	async findAll(@Body() searchStudentDto: SearchStudentDto, @Req() req, @Res() res) {
		
		try {

			const students = await this.studentService.findStudent(searchStudentDto, req.user);

			return res.status(HttpStatus.OK).json({
				success: true,
				message: 'Child Mapped with Parent',
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

	@Get('map/:id')
	async mapStudent(@Param('id') id: string, @Req() req, @Res() res) {
		try {

			await this.studentService.mapStudent(id, req.user);

			return res.status(HttpStatus.OK).json({
				success: true,
				message: 'Student Mapped with Parent'
			});

		} catch (err) {
			console.log(err);

			if (err instanceof BadRequestException) {
				return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: err.message })
			}

			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success: false, message: err.message });			

		}
	}

	/* @Patch(':id')
	update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
		return this.studentService.update(+id, updateStudentDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.studentService.remove(+id);
	} */
}
