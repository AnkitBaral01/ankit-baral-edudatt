import { Injectable } from '@nestjs/common';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SchoolDocument } from './entities/school.entity';
import { Model } from 'mongoose';

@Injectable()
export class SchoolService {


	constructor(
		@InjectModel('schools') private readonly schoolModel: Model<SchoolDocument>,
	) { }


	async create(createSchoolDto: CreateSchoolDto) {

		const school = new this.schoolModel();

		school.name = createSchoolDto.name;
		school.address = createSchoolDto.address;
		school.phone_number = createSchoolDto.phone_number;
		school.email = createSchoolDto.email;
		school.website = createSchoolDto.website;
		
		await school.save();

	}

	async findAll(query: any) {

		if (query.hasOwnProperty('name')) {

			const schools = await this.schoolModel.find({ name: { $regex: query.name, $options: 'i' } }).exec();

			return schools;
		}

		const schools = await this.schoolModel.find().exec();

		return schools;

	}

	async findOne(id: string) {
		
		const school = await this.schoolModel.findOne({_id: id}).exec();

		return school;

	}

	/* update(id: number, updateSchoolDto: UpdateSchoolDto) {
		return `This action updates a #${id} school`;
	}

	remove(id: number) {
		return `This action removes a #${id} school`;
	} */
}
