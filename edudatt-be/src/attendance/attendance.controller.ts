import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, BadRequestException, HttpStatus } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { AccessTokenGuard } from 'src/common/accessToken.guard';
import { StudentGuard } from 'src/common/student.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('attendance')
@UseGuards(AccessTokenGuard)
@UseGuards(StudentGuard)
@Controller('attendance')
export class AttendanceController {
	constructor(private readonly attendanceService: AttendanceService) { }

	/* @Post()
	create(@Body() createAttendanceDto: CreateAttendanceDto) {
		return this.attendanceService.create(createAttendanceDto);
	} */

	/* @Get()
	findAll() {
		return this.attendanceService.findAll();
	} */

	@ApiOperation({ summary: 'Get attendance of student' })
	@Get()
	async findOne(@Req() req, @Res() res) {
		
		try {
		
			const attendance = await this.attendanceService.findOne(req);

			return res.status(HttpStatus.OK).json({ success: true, message: 'Attendance', data: attendance });

		} catch (err) {
			
			if (err instanceof BadRequestException) {
				return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: err.message });
			}

			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: err.message });
		}


	}

	@Post('leave-request')
	async leaveRequest(@Req() req, @Res() res, @Body() createAttendanceDto: CreateAttendanceDto) {
	
		try {
			

			return res.status(HttpStatus.OK).json({ success: true, message: 'Leave request sent' });

		} catch (err) {
			if (err instanceof BadRequestException) {
				return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: err.message });
			}

			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: err.message });
		}

	}

	/* @Patch(':id')
	update(@Param('id') id: string, @Body() updateAttendanceDto: UpdateAttendanceDto) {
		return this.attendanceService.update(+id, updateAttendanceDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		 return this.attendanceService.remove(+id);
	}*/
}
