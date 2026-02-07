import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException, Res, HttpStatus, Req } from '@nestjs/common';
import { SchoolService } from './school.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/accessToken.guard';

@ApiTags('school')
@Controller('school')
export class SchoolController {
	constructor(private readonly schoolService: SchoolService) { }

	@UseGuards(AccessTokenGuard)
	@Post()
	async create(@Body() createSchoolDto: CreateSchoolDto, @Res() res, @Req() req) {

		try {

			await this.schoolService.create(createSchoolDto);

			return res.status(HttpStatus.OK).json({success: true, message: 'School created successfully!' });

		} catch (err) {
			console.log(err);

			if (err instanceof BadRequestException) {
				return res.status(HttpStatus.BAD_REQUEST).json({success: false, message: err.message })
			}

			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success: false, message: err.message });

		}

	}


	@UseGuards(AccessTokenGuard)
	@Get()
	async findAll(@Req() req, @Res() res) {
		try {

			const schools = await this.schoolService.findAll(req.query);
			
			return res.status(HttpStatus.OK).json({
				success: true,
				message: 'List of school',
				data: schools
			});

		} catch (err) {
			console.log(err);

			if (err instanceof BadRequestException) {
				return res.status(HttpStatus.BAD_REQUEST).json({success: false, message: err.message })
			}

			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success: false, message: err.message });			

		}


	}

	@UseGuards(AccessTokenGuard)
	@Get(':id')
	async findOne(@Param('id') id: string, @Res() res) {
		try {

			const school =  await this.schoolService.findOne(id);
			
			return res.status(HttpStatus.OK).json({
				success: true,
				message: 'School details',
				data: school
			});

		} catch (err) {
			console.log(err);

			if (err instanceof BadRequestException) {
				return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: err.message })
			}

			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({success: false, message: err.message });			

		}
	}

	/* @Patch(':id')
	update(@Param('id') id: string, @Body() updateSchoolDto: UpdateSchoolDto) {
		return this.schoolService.update(+id, updateSchoolDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.schoolService.remove(+id);
	} */
}
