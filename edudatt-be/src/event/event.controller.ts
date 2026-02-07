import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, BadRequestException, HttpStatus } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { AccessTokenGuard } from 'src/common/accessToken.guard';
import { ApiBearerAuth, ApiDefaultResponse, ApiHeader, ApiTags } from '@nestjs/swagger';
import { StudentGuard } from 'src/common/student.guard';

@ApiTags('event')
@UseGuards(AccessTokenGuard)
@Controller('event')
export class EventController {
	constructor(private readonly eventService: EventService) { }

	@Post()
	async create(@Body() createEventDto: CreateEventDto, @Req() req, @Res() res) {
		
		try {

			await this.eventService.create(createEventDto);
			
			return res.status(HttpStatus.OK).json({
				success: true,
				message: 'Event created successfully'
			});

		} catch (err) {

			if (err instanceof BadRequestException) {
				return res.status(HttpStatus.BAD_REQUEST).json({
					success: false,
					message: err.message
				});
			}
			
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				success: false,
				message: err.message
			});
		}

	}

	@ApiHeader({
		name: 'Student',
		description: 'Student ID',
		required: true
	})
	@UseGuards(StudentGuard)
	@Get()
	async findAll(@Req() req, @Res() res) {

		try {

			const events = await this.eventService.findAll(req.student);

			return res.status(HttpStatus.OK).json({
				success: true,
				message: 'Event fetched successfully',
				data: events
			});

		} catch (err) {

			if (err instanceof BadRequestException) {
				return res.status(HttpStatus.BAD_REQUEST).json({
					success: false,
					message: err.message
				});
			}
			
			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				success: false,
				message: err.message
			});
		}

		// return this.eventService.findAll();
	}

	// @Get(':id')
	// findOne(@Param('id') id: string) {
	// 	return this.eventService.findOne(+id);
	// }

	// @Patch(':id')
	// update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
	// 	return this.eventService.update(+id, updateEventDto);
	// }

	// @Delete(':id')
	// remove(@Param('id') id: string) {
	// 	return this.eventService.remove(+id);
	// }
}
