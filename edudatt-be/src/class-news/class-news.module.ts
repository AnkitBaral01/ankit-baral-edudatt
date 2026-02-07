import { Module } from '@nestjs/common';
import { ClassNewsService } from './class-news.service';
import { ClassNewsController } from './class-news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassNewSchema } from './entities/class-news.entity';
import { StudentModule } from 'src/student/student.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'ClassNews', schema: ClassNewSchema}
		]),
		StudentModule
	],
	controllers: [ClassNewsController],
	providers: [ClassNewsService],
})
export class ClassNewsModule { }
