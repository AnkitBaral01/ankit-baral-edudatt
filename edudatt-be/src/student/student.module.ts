import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './entities/student.entity';
import { UserModule } from 'src/user/user.module';

@Module({

	imports: [
		MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
		UserModule
	],
	controllers: [StudentController],
	providers: [StudentService],
	exports: [StudentService]
})
export class StudentModule { }
