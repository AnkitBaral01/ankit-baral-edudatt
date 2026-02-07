import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, HttpStatus, BadRequestException } from '@nestjs/common';
import { ClassService } from './class.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { AccessTokenGuard } from 'src/common/accessToken.guard';
import { ApiDefaultResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('class')
@UseGuards(AccessTokenGuard)
@Controller('class')
export class ClassController {
	constructor(private readonly classService: ClassService) { }

	@Post()
	async create(@Body() createClassDto: CreateClassDto, @Req() req, @Res() res) {

		try {
		
			await this.classService.create(createClassDto, req);

			return res.status(HttpStatus.OK).json({ success: true, message: 'Class added' });

		} catch (err) {

			if (err instanceof BadRequestException) {
				return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: err.message })
			}

			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: err.message });

		}

	}

	@ApiDefaultResponse({ description: 'Fetch list classes based on schoolId' })
	@Get(':schoolId')
	async findAll(@Param('schoolId') schoolId: string, @Req() req, @Res() res) {
		
		try {

			const classes = await this.classService.findAll(schoolId);

			return res.status(HttpStatus.OK).json({ success: true, message:'List of classes', data: classes });

			
		} catch (err) {
			
			if (err instanceof BadRequestException) {
				return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: err.message })
			}

			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: err.message });

		}
		

		// return this.classService.findAll();
	}

	/* @Get(':id')
	findOne(@Param('id') id: string) {
		return this.classService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateClassDto: UpdateClassDto) {
		return this.classService.update(+id, updateClassDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.classService.remove(+id);
	} */
}
