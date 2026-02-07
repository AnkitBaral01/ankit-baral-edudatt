import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Class } from './entities/class.entity';
import { SchoolService } from 'src/school/school.service';

@Injectable()
export class ClassService {

	constructor(
		@InjectModel('classes') private classModel: Model<Class>,
		private readonly schoolService: SchoolService
	){}

	async create(createClassDto: CreateClassDto, req: any) {

		if (req.user) {
			// for check	
		}

		const school = await this.schoolService.findOne(createClassDto.school);

		if (!school) {
			throw new BadRequestException('School not found');
		}

		const classData = new this.classModel();

		classData.name = createClassDto.name;
		classData.school = school._id;

		await classData.save();
		
	}

	async findAll(schoolId: string) {
		console.log(schoolId);
		const classes = await this.classModel.find(
			{
				school: new Types.ObjectId(schoolId)
			}).exec();

		return classes;

	}

	async findOne(id: string) { 

		const classData = await this.classModel.findOne({ _id: id }).exec();

		if (!classData) {
			throw new BadRequestException('Class not found');
		}

		return classData;

	}

	/* findOne(id: number) {
		return `This action returns a #${id} class`;
	}

	update(id: number, updateClassDto: UpdateClassDto) {
		return `This action updates a #${id} class`;
	}

	remove(id: number) {
		return `This action removes a #${id} class`;
	} */
}
