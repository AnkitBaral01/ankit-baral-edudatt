import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Event, EventDocument } from './entities/event.entity';

@Injectable()
export class EventService {

	constructor(
		@InjectModel('events') private readonly eventModel: Model<EventDocument>
	) {

	}

	async create(createEventDto: CreateEventDto) {

		const event = new this.eventModel(createEventDto);

		// fetch school and classes
		// check if school exists
		// check if classes exist

		await event.save();

	}

	async findAll(student: any) {

		const query = {};
		if (student.school) {
			query['school'] = student.school
		}

		query['start_date'] = {
			$gte: new Date(new Date().toISOString().split("T")[0] + "T00:00:00.000Z")
		};

		const events = await this.eventModel.find(query).exec();
		
		return await this.formatData(events);

	}

	private async formatData(events: EventDocument[]) {

		const formattedEvents: Record<string, { title: string; details: string, start_date: Date }[]> = {};

		// Process events
		events.forEach(event => {
			const eventDate = new Date(event.start_date)
								.toISOString()
								.split("T")[0];

			if (!formattedEvents[eventDate]) {
				formattedEvents[eventDate] = [];
			}

			formattedEvents[eventDate].push({
				title: event.title,
				details: event.description,
				start_date: event.start_date,
			});
		});

		return formattedEvents;
	}


	// findOne(id: number) {
	// 	return `This action returns a #${id} event`;
	// }

	// update(id: number, updateEventDto: UpdateEventDto) {
	// 	return `This action updates a #${id} event`;
	// }

	// remove(id: number) {
	// 	return `This action removes a #${id} event`;
	// }
}
