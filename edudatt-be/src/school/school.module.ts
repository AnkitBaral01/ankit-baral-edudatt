import { Module } from '@nestjs/common';
import { SchoolService } from './school.service';
import { SchoolController } from './school.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SchoolSchema } from './entities/school.entity';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'schools', schema: SchoolSchema}
		])
	],
	controllers: [SchoolController],
	providers: [SchoolService],
	exports: [SchoolService]
})
export class SchoolModule { }
