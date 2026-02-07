import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRepotCardDto } from './dto/create-repot-card.dto';
import { UpdateRepotCardDto } from './dto/update-repot-card.dto';
import { StudentService } from 'src/student/student.service';
import { ClassService } from 'src/class/class.service';
import { feedbackComments, subjectsList } from 'src/common/samples/subjects';
import { ReportCardColors, ReportFeedBacks } from 'src/common/samples/data-colors';

@Injectable()
export class RepotCardService {

	constructor(
		private readonly studentService: StudentService,
		private readonly classService: ClassService
	) { }


	create(createRepotCardDto: CreateRepotCardDto) {
		return 'This action adds a new repotCard';
	}

	findAll() {
		return `This action returns all repotCard`;
	}

	async findOne(student: any, req) {

		const studentData = await this.studentService.getStudentById(student.id, req.user);

		if (!studentData) {
			throw new BadRequestException('Student not found');
		}

		const classId: string = studentData.class._id.toString();

		const classData = await this.classService.findOne(classId);

		if (!classData) {
			throw new BadRequestException('Class not found');
		}

		let subjectsNames = [];
		
		if (!subjectsList.hasOwnProperty(classData.name)) { 
			subjectsNames = subjectsList['default'];
		} else {
			subjectsNames = subjectsList[classData.name];
		}
	
		const reportCard = {
			id: studentData.id,
			name: studentData.first_name + ' ' + studentData.last_name,
			class: classData.name,
			exams: {
				"Q1": await this.prepareDummyData(subjectsNames),
				"Q2": await this.prepareDummyData(subjectsNames),
				"Q3": await this.prepareDummyData(subjectsNames),
				"Final": await this.prepareDummyData(subjectsNames),
			}
		};

		return reportCard;


	}

	private async prepareDummyData(subjectsNames: any, ) {
		
		const reportCard = subjectsNames.map((subject: any, index) => { 

			const totalMarks = 100;
			const obtainedMarks = Math.floor(Math.random() * 61) + 30; // Random marks between 30 and 100
			const feedBack = this.getFeedBack(obtainedMarks);

			let bgColor = '#ffffff';
			let textColor = '#000000';

			bgColor = this.getReportCardColor(obtainedMarks);

			return {
				id: index + 1,
				name: subject,
				total_marks: totalMarks,
				obtained_marks: obtainedMarks,
				feedback: feedBack,
				papers: [
					{
						"id": 1,
						"image_url": "https://rajangautam.com.np"
					}
				],
				text_color: textColor,
				bg_color: bgColor
			};


		})


		return reportCard;
	}

	private getReportCardColor(marks: number): string {
		if (marks >= 90) {
		  return ReportCardColors.Excellent;
		} else if (marks >= 75) {
		  return ReportCardColors.Good;
		} else if (marks >= 50) {
		  return ReportCardColors.Average;
		} else {
		  return ReportCardColors.Poor;
		}
	}


	private getFeedBack(marks: number): string {
		if (marks >= 90) {
		  return ReportFeedBacks.Excellent;
		} else if (marks >= 75) {
		  return ReportFeedBacks.Good;
		} else if (marks >= 50) {
		  return ReportFeedBacks.Average;
		} else {
		  return ReportFeedBacks.Poor;
		}
	}


	update(id: number, updateRepotCardDto: UpdateRepotCardDto) {
		return `This action updates a #${id} repotCard`;
	}

	remove(id: number) {
		return `This action removes a #${id} repotCard`;
	}
}
