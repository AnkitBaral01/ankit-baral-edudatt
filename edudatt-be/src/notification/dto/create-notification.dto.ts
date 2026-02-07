
import { IsString, IsEnum, IsOptional, IsDate, IsMongoId } from 'class-validator';

import { Type } from 'class-transformer';
import { NotificationCategory, NotificationType } from 'src/common/enums/notification-type.enums';

export class CreateNotificationDto {

    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    redirect_url: string;

    @IsEnum(NotificationType)
    @IsOptional()
    type?: NotificationType;

    @IsEnum(NotificationCategory)
    @IsOptional()
    category?: NotificationCategory;

    @IsMongoId()
    user: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    sent_at?: Date | null;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    read_at?: Date | null;

    @IsOptional()
    @IsString({ each: true })
    fcm_tokens?: string[];

}

export class UpdateNotificationDto{

    @IsOptional()
    @IsMongoId({ each: true })
    notification_ids?: string[];

}