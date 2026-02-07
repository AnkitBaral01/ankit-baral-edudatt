import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsMongoId } from 'class-validator';
import * as mongoose from 'mongoose';


export class CreateClassNewsDto {

	@ApiProperty({ description: 'The heading of the notification', example: 'New Assignment' })
	@IsString()
	@IsNotEmpty()
	heading: string;

	@ApiProperty({ description: 'The content of the notification', example: 'You have a new assignment due on Friday' })
	@IsString()
	@IsNotEmpty()
	content: string;

	@ApiProperty({ description: 'Class ID the notification is related to', example: '60c72b2f9b1d4b3d8c7f9a8e' })
	@IsMongoId()
	class: string;

	@ApiProperty({ description: 'School ID the notification belongs to', example: '60c72b2f9b1d4b3d8c7f9a8f' })
	@IsMongoId()
	school: string;


	@ApiProperty({ description: 'Is this a reminder?', example: false })
	@IsNotEmpty()
	is_reminder: boolean;

	@ApiProperty({ description: 'Is this an achievement?', example: false })
	@IsNotEmpty()
	is_achievement: boolean;

}
