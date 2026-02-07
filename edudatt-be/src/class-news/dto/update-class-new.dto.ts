import { PartialType } from '@nestjs/swagger';
import { CreateClassNewsDto } from './create-class-new.dto';

export class UpdateClassNewDto extends PartialType(CreateClassNewsDto) {}
