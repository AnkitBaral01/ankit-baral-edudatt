import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { InjectModel } from '@nestjs/mongoose';
import { NotificationDocument } from './entities/notification.entity';
import { Model } from 'mongoose';
import { NotificationType } from 'src/common/enums/notification-type.enums';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class NotificationService {

	constructor(
		@InjectModel('Notification') private readonly notificationModel: Model<NotificationDocument>,
		private readonly firebaseService: FirebaseService,
		private readonly userService: UserService,
	) { }

	async create(createNotificationDto: CreateNotificationDto, user: any) {

		// create notification

		const userId = createNotificationDto.user;

		const fcmTokens = await this.userService.findOne(userId).then(user => user.fcm_tokens);

		console.log("fcmTokens", fcmTokens);

		createNotificationDto.fcm_tokens = fcmTokens;

		const notification = new this.notificationModel(createNotificationDto);

		await notification.save();

		// send to push or SMS or email.
		if (notification.type == NotificationType.PUSH) {
			this.pushNotification(notification);
		}

	}

	async findAll(user: any) {

		const query = { user: user.sub };

		return await this.notificationModel.find(query).sort({ createdAt: -1 }).exec();

	}

	async markRead(user: any, id: string[]) {

		await this.notificationModel.updateMany({ _id: { $in: id } }, { read_at: new Date() });

	}

	async markSent(id: string) {

		await this.notificationModel.updateOne({ _id: id }, { sent_at: new Date() });

	}

	async pushNotification(notification: NotificationDocument) {

		try {

			console.log("sending push notification");

			if (notification.fcm_tokens.length == 0) {
				return;
			}

			const fcm_tokens = notification.fcm_tokens;

			const notificationData = {
				title: notification.title,
				body: notification.description,
				click_action: notification.redirect_url
			};
			console.log("notificationData", notificationData);
			this.firebaseService.sendPushNotification(fcm_tokens, notificationData);

			this.markSent(notification.id);

		} catch (e) {
			console.error("error in push notification", e);
		}

	}

}
