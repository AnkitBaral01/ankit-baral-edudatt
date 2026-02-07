import * as admin from 'firebase-admin';
import { Injectable, OnModuleInit } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class FirebaseService implements OnModuleInit {
	onModuleInit() {
		try {

			if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_PRIVATE_KEY || !process.env.FIREBASE_CLIENT_EMAIL) {
				throw new Error('Missing Firebase environment variables.');
			}

			if (!admin.apps.length) {
				admin.initializeApp({
					credential: admin.credential.cert({
						projectId: process.env.FIREBASE_PROJECT_ID,
						privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
						clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
					}),
				});
			}
		} catch (error) {
			console.error('Firebase initialization error:', error.message);
		}
	}

	async sendPushNotification(tokens: string[], notificationData: any) {
		try {

			const response = await admin.messaging().sendEachForMulticast({
				tokens,
				notification: notificationData,
			});

			console.log('Push notification sent successfully!', response);
		} catch (error) {
			console.error('Error sending push notification:', error.message);
		}
	}
}
