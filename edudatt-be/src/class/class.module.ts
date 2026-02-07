import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CLassSchema } from './entities/class.entity';
import { SchoolModule } from 'src/school/school.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'classes', schema: CLassSchema }
		]),
		SchoolModule
	],
	controllers: [ClassController],
	providers: [ClassService],
	exports: [ClassService]
})
export class ClassModule { }
