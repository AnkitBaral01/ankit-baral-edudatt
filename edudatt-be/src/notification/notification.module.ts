import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema } from './entities/notification.entity';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UserModule } from 'src/user/user.module';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: 'Notification', schema: NotificationSchema }
		]),
		UserModule
	],
	controllers: [NotificationController],
	providers: [NotificationService, FirebaseService],
	exports: [NotificationService]
})
export class NotificationModule { }
