import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, BadRequestException, HttpStatus } from '@nestjs/common';
import { RepotCardService } from './repot-card.service';
import { CreateRepotCardDto } from './dto/create-repot-card.dto';
import { UpdateRepotCardDto } from './dto/update-repot-card.dto';
import { AccessTokenGuard } from 'src/common/accessToken.guard';
import { ApiDefaultResponse, ApiHeader, ApiTags } from '@nestjs/swagger';
import { StudentGuard } from 'src/common/student.guard';

@ApiTags('report-card')
@UseGuards(AccessTokenGuard)
@Controller('repot-card')
export class RepotCardController {
	constructor(private readonly repotCardService: RepotCardService) { }

	/* @Post()
	create(@Body() createRepotCardDto: CreateRepotCardDto) {
	  return this.repotCardService.create(createRepotCardDto);
	} */

	/* @Get()
	findAll() {
		return this.repotCardService.findAll();
	} */

	@ApiHeader({
		name: 'student',
		description: 'It will provide the report card of the student given in header student',
		required: true
	})
	@UseGuards(StudentGuard)
	@Get()
	async findOne(@Req() req: any, @Res() res: any) {

		try {

			const reportCard = await this.repotCardService.findOne(req.student, req);
			
			return res.status(HttpStatus.OK).json({ success: true, data: reportCard });

		} catch (err) {
			
			console.log(err);

			if (err instanceof BadRequestException) {
				return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: err.message });
			}

			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: true, message: err.message });

		}


	}

	/* @Patch(':id')
	update(@Param('id') id: string, @Body() updateRepotCardDto: UpdateRepotCardDto) {
		return this.repotCardService.update(+id, updateRepotCardDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.repotCardService.remove(+id);
	} */
}
