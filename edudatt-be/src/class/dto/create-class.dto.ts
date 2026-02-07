import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateClassDto {
  @ApiProperty({ example: 'Class 10 - A', description: 'Name of the class' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '60d21b4667d0d8992e610c85', description: 'MongoDB ObjectId of the school' })
  @IsMongoId()
  school: string;
}

export class UpdateClassDto {
  @ApiProperty({ example: 'Class 10 - A', description: 'Updated name of the class', required: false })
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty({ example: '60d21b4667d0d8992e610c85', description: 'Updated school reference', required: false })
  @IsMongoId()
  school?: string;
}
