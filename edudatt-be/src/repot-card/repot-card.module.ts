import { Module } from '@nestjs/common';
import { RepotCardService } from './repot-card.service';
import { RepotCardController } from './repot-card.controller';
import { StudentModule } from 'src/student/student.module';
import { ClassModule } from 'src/class/class.module';

@Module({
	imports: [StudentModule, ClassModule],
	controllers: [RepotCardController],
	providers: [RepotCardService],
})
export class RepotCardModule { }
