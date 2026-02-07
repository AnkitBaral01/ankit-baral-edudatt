import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, BadRequestException, HttpStatus } from '@nestjs/common';
import { ClassNewsService } from './class-news.service';
import { CreateClassNewsDto } from './dto/create-class-new.dto';
import { UpdateClassNewDto } from './dto/update-class-new.dto';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/accessToken.guard';
import { StudentGuard } from 'src/common/student.guard';


@UseGuards(AccessTokenGuard)
@ApiTags('class-news')
@Controller('class-news')
export class ClassNewsController {
	constructor(private readonly classNewsService: ClassNewsService) { }

	@Post()
	async create(@Body() createClassNewDto: CreateClassNewsDto, @Req() req, @Res() res) {

		try {

			await this.classNewsService.create(createClassNewDto, req);

			
			return res.status(HttpStatus.OK).json({ success: true, message: 'Class News added' });

		} catch (err) {

			if (err instanceof BadRequestException) {
				return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: err.message })
			}

			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: err.message });
			
		}

	}

	@UseGuards(StudentGuard)
	@Get()
	async findAll(@Req() req, @Res() res) {
		
		try {

			const news = await this.classNewsService.findAll(req);
			console.log(news);
			return res.status(HttpStatus.OK).json({ success: true, message:'Class news', data: news });

		} catch (err) {
			
			if (err instanceof BadRequestException) {
				return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: err.message })
			}

			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: err.message });

		}
		
	}

	@Get(':id')
	findOne(@Req() req, @Param('id') id: string, @Res() res) {

		try {

			const news = this.classNewsService.findOne(req, id);

			return res.status(HttpStatus.OK).json({ success: true, message: 'Class news', data: news });

		} catch (err) { 

			if (err instanceof BadRequestException) {
				return res.status(HttpStatus.BAD_REQUEST).json({ success: false, message: err.message })
			}

			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ success: false, message: err.message });

		}
		
	}

	/* @Patch(':id')
	update(@Param('id') id: string, @Body() updateClassNewDto: UpdateClassNewDto) {
		return this.classNewsService.update(+id, updateClassNewDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.classNewsService.remove(+id);
	} */
}
