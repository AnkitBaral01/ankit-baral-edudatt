import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsDate, IsOptional, IsBoolean, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import mongoose from 'mongoose';


export class CreateEventDto {
	@ApiProperty({ example: 'Annual Sports Day', description: 'Title of the event' })
	@IsString()
	@IsNotEmpty()
	title: string;

	@ApiProperty({ example: 'A fun-filled sports event for students.', description: 'Description of the event' })
	@IsString()
	@IsNotEmpty()
	description: string;

	@ApiProperty({ example: '2025-04-10T09:00:00Z', description: 'Start date of the event in ISO format' })
	@IsDate()
	@Type(() => Date)
	start_date: Date;

	@ApiProperty({ example: '2025-04-10T12:00:00Z', description: 'End date of the event in ISO format', required: false })
	@IsOptional()
	@IsDate()
	@Type(() => Date)
	end_date?: Date | null;

	@ApiProperty({ example: '67e18b5b8f2b53ed6dcbd787', description: 'ID of the school organizing the event' })
	@IsNotEmpty()
	school: mongoose.Types.ObjectId;

	@ApiProperty({ example: ['67e2c64dc85ae4557a97b6af'], description: 'Array of class IDs associated with the event', required: false })
	@IsArray()
	@IsOptional()
	classes?: mongoose.Types.ObjectId[];

	@ApiProperty({ example: true, description: 'Indicates if the event is public' })
	@IsBoolean()
	is_public: boolean;
}
