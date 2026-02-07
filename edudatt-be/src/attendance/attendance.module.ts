import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { StudentModule } from 'src/student/student.module';

@Module({
	imports: [
		StudentModule
	],
	controllers: [AttendanceController],
	providers: [AttendanceService],
})
export class AttendanceModule { }
