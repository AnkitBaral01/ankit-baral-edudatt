import { Injectable } from '@nestjs/common';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { StudentService } from 'src/student/student.service';
import { AttendanceColors, LeaveColors } from 'src/common/samples/data-colors';

@Injectable()
export class AttendanceService {
	private publicHolidays = [5, 15, 26]; // Example public holidays (5th, 15th, 26th of the month)
	private leaveTypes = ['Planned Leave', 'Sick Leave', 'Unplanned Leave', 'Annual Leave'];
	private leaveApplications = [
		{ from: '10/04/2025', to: '10/04/2025', type:'Planned', type_text: 'Planned Leave', status: 'Approved', reason: "Brother's marriage" },
		{ from: '26/04/2025', to: '26/04/2025', type:'Planned', type_text: 'Planned Leave', status: 'Rejected', reason: 'Holiday trip' },
		{ from: '16/04/2025', to: '16/04/2025', type:'Unplanned', type_text: 'UnPlanned Leave', status: 'Rejected', reason: 'Holiday trip' },
		{ from: '24/04/2025', to: '24/04/2025', type:'Sick', type_text: 'Sick Leave', status: 'Approved', reason: 'Dr Visit' },
	];

	constructor(
		private readonly studentService: StudentService
	) { }


	create(createAttendanceDto: CreateAttendanceDto) {
		return 'This action adds a new attendance';
	}

	findAll() {
		return `This action returns all attendance`;
	}

	async findOne(req: any) {

		const student = await this.studentService.getStudentById(req.student, req.user)

		const dummyAttendance = await this.generateDummyAttendance();


		console.log(dummyAttendance);

		const studentAttendance = {
			id: student.id,
			name: student.first_name + ' ' + student.last_name,
			...dummyAttendance,
		}

		return studentAttendance;
	}

	async generateDummyAttendance(monthYear?: string) {
		const currentDate = new Date();
		const currentYear = currentDate.getFullYear();
		const currentMonth = currentDate.getMonth() + 1;
		const currentDay = currentDate.getDate();
	
		const attendanceRecord = {};
		const leaveTracker = {
			planned: [],
			unplanned: [],
			sick: [],
		};
	
		let totalDays = 0;
		let presentDays = 0;
	
		const processMonth = (month: number, year: number) => {
			const formattedMonthYear = `${month.toString().padStart(2, '0')}/${year}`;
			const attendanceArray = this.generateMonthAttendance(
				formattedMonthYear,
				currentYear,
				currentMonth,
				currentDay,
				leaveTracker,
				(day) => {
					totalDays++;
					if (day.is_present) presentDays++;
				}
			);
			attendanceRecord[formattedMonthYear] = attendanceArray;
		};
	
		if (monthYear) {
			const [monthStr, yearStr] = monthYear.split('/');
			processMonth(parseInt(monthStr), parseInt(yearStr));
		} else {
			for (let month = 1; month <= currentMonth; month++) {
				processMonth(month, currentYear);
			}
		}
	
		const attendancePercentage = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 0;
	
		return {
			attendance: attendanceRecord,
			attendance_percentage: `${attendancePercentage}%`,
			planned_leaves: leaveTracker.planned,
			unplanned_leaves: leaveTracker.unplanned,
			sick_leaves: leaveTracker.sick,
		};
	}
	
	private generateMonthAttendance(
		monthYear: string,
		currentYear: number,
		currentMonth: number,
		currentDay: number,
		leaveTracker,
		onDayProcessed: (entry) => void
	) {
		const [month, year] = monthYear.split('/').map(Number);
		const daysInMonth = new Date(year, month, 0).getDate();
		const attendance = [];
	
		for (let day = 1; day <= daysInMonth; day++) {
			const date = new Date(year, month - 1, day);
			const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
			const formattedDate = this.formatDate(day, month, year);
	
			let isPresent = day <= currentDay ? true : null;
			let leave = this.getLeaveDetails(formattedDate);

			let bgColor = AttendanceColors[isPresent ? 'Present' : 'Absent'];
			let textColor = '#000000';

			if (leave) {
				isPresent = false;
	
				const leaveEntry = {
					start_date: leave.from,
					end_date: leave.to
				};
	
				if (leave.type === 'Planned') {
					leaveTracker.planned.push(leaveEntry);
					bgColor = LeaveColors.Planned;
				}
				else if (leave.type === 'Unplanned') {
					leaveTracker.unplanned.push(leaveEntry);
					bgColor = LeaveColors.UnPlanned;
				}
				else if (leave.type === 'Sick') {
					leaveTracker.sick.push(leaveEntry);
					bgColor = LeaveColors.Sick;
				}
			} else if (dayOfWeek === 0 || dayOfWeek === 6) {
				isPresent = false;
				leave = {
					type: 'Weekend',
					status: 'Approved',
					from: formattedDate,
					to: formattedDate,
					days: 1,
					reason: ''
				};
			} else if (this.publicHolidays.includes(day)) {
				isPresent = false;
				leave = {
					type: 'Public Holiday',
					status: 'Approved',
					from: formattedDate,
					to: formattedDate,
					days: 1,
					reason: ''
				};

				bgColor = AttendanceColors.Holiday;

			}

			const attendanceObj = {
				date: formattedDate,
				day: date.toLocaleDateString('en-US', { weekday: 'long' }),
				is_present: isPresent,
				text_color: textColor,
				bg_color: bgColor,
				leave
			};
	
			attendance.push(attendanceObj);
			onDayProcessed(attendanceObj);
		}
	
		return attendance;
	}
	

	private getLeaveDetails(date: string) {
		for (const leave of this.leaveApplications) {
			if (this.isDateInRange(date, leave.from, leave.to)) {
				return {
					type: leave.type,
					status: leave.status,
					from: leave.from,
					to: leave.to,
					days: this.calculateLeaveDays(leave.from, leave.to),
					reason: leave.reason
				};
			}
		}
		return null;
	}

	private isDateInRange(date: string, from: string, to: string): boolean {
		const targetDate = new Date(date.split('/').reverse().join('-'));
		const fromDate = new Date(from.split('/').reverse().join('-'));
		const toDate = new Date(to.split('/').reverse().join('-'));
		return targetDate >= fromDate && targetDate <= toDate;
	}

	private calculateLeaveDays(from: string, to: string): number {
		const fromDate = new Date(from.split('/').reverse().join('-'));
		const toDate = new Date(to.split('/').reverse().join('-'));
		return Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
	}

	private formatDate(day: number, month: number, year: number): string {
		return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
	}
}
