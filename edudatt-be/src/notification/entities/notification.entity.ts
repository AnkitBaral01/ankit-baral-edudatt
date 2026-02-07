import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { NotificationCategory, NotificationType } from "src/common/enums/notification-type.enums";
import { BaseEntity } from "src/common/types/base-entity.type";
import { User } from "src/user/entities/user.entity";


@Schema({timestamps: true, collection: 'notifications'})
export class Notification extends BaseEntity{ 

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: false, default: null })
    redirect_url: string;

    @Prop({ type: String, required: true, default: NotificationType.PUSH })
    type: NotificationType;

    @Prop({ type: String, required: true, default: NotificationCategory.GENERAL })
    category: NotificationCategory;

    @Prop({ type: mongoose.Types.ObjectId, ref:'User', required: true })
    user: User;

    @Prop({ required: false, default: null })
    sent_at: Date | null;
    
    @Prop({ required: false, default: null })
    read_at: Date | null;

    @Prop({ required: false, default: [] })
    fcm_tokens: string[];
}

const NotificationSchema = SchemaFactory.createForClass(Notification);
export type NotificationDocument = HydratedDocument<Notification>;

export { NotificationSchema };

