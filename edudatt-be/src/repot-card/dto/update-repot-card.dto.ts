import { PartialType } from '@nestjs/swagger';
import { CreateRepotCardDto } from './create-repot-card.dto';

export class UpdateRepotCardDto extends PartialType(CreateRepotCardDto) {}
