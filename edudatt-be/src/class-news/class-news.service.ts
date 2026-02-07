import { Injectable, UseGuards } from '@nestjs/common';
import { CreateClassNewsDto } from './dto/create-class-new.dto';
import { UpdateClassNewDto } from './dto/update-class-new.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ClassNews, ClassNewDocument } from './entities/class-news.entity';
import mongoose, { Model, Types } from 'mongoose';

@Injectable()
export class ClassNewsService {
	
	constructor(
		@InjectModel('ClassNews') private classNewModel: Model<ClassNews>
	) {
		
	}
	
	async create(createClassNewsDto: CreateClassNewsDto, req: any) {
		
		const classNews = new this.classNewModel();
		classNews.school = new Types.ObjectId(createClassNewsDto.school);
		classNews.class = new Types.ObjectId(createClassNewsDto.class);
		classNews.heading = createClassNewsDto.heading;
		classNews.content = createClassNewsDto.content;
		classNews.is_reminder = createClassNewsDto.is_reminder;
		classNews.is_achievement = createClassNewsDto.is_achievement;
		
		await classNews.save();
	}

	
	async findAll(req) {
		
		const student = req.student;

		const query = { class:student.class, school: student.school };

		return await this.classNewModel.find(query).sort({ createdAt: -1 }).exec();

	}

	async findOne(req, id: string) {
		
		const student = req.student;

		return await this.classNewModel.findOne({ _id: id, class: student.class, school: student.school }).exec();

	}

/* 	update(id: number, updateClassNewDto: UpdateClassNewDto) {
		return `This action updates a #${id} classNew`;
	}

	remove(id: number) {
		return `This action removes a #${id} classNew`;
	} */
}
