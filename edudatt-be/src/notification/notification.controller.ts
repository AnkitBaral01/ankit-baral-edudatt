import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, BadRequestException, Res, Req, HttpStatus } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto, UpdateNotificationDto } from './dto/create-notification.dto';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/accessToken.guard';

@UseGuards(AccessTokenGuard)
@ApiTags('notification')
@Controller('notification')
export class NotificationController {
	constructor(private readonly notificationService: NotificationService) { }

	@Post()
	async create(@Body() createNotificationDto: CreateNotificationDto, @Res() res, @Req() req) {
		
		try {

			await this.notificationService.create(createNotificationDto, req.user);

			return res.status(HttpStatus.OK).json({
				success: true,
				message: 'Notification created successfully',
			});

		} catch (err) {
			
			if (err instanceof BadRequestException) {
				return res.status(400).json({
					success: false,
					message: err.message,
				});
			}

			return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
				success: false,
				message: err.message
			});

		}
		
	}

	@Get()
	async findAll(@Res() res, @Req() req) {
		
		try {

			const notifications = await this.notificationService.findAll(req.user);

			return res.status(HttpStatus.OK).json({
				success: true,
				message: "List of notifications",
				data: notifications
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

	@Post('mark-read')
	async markRead(@Req() req, @Res() res, @Body() body: UpdateNotificationDto) {

		try {

			await this.notificationService.markRead( req.user, body.notification_ids);

			return res.status(HttpStatus.OK).json({
				success: true,
				message: 'Notification marked as read successfully'
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


}
