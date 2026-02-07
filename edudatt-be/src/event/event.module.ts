import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './entities/event.entity';
import { SchoolModule } from 'src/school/school.module';
import { ClassModule } from 'src/class/class.module';
import { StudentModule } from 'src/student/student.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'events', schema: EventSchema }
		]),
		SchoolModule,
		ClassModule,
		StudentModule
	],
	controllers: [EventController],
	providers: [EventService],
})
export class EventModule { }
