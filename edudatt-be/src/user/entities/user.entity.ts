import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { BaseEntity } from "src/common/types/base-entity.type";

@Schema({timestamps: true, collection: 'users'})
export class User extends BaseEntity { 

    @Prop({ required: true })
    first_name: string;

    @Prop({ required: true })
    last_name: string;

    @Prop({ required: false })
    mobile_number?: string;

    @Prop({ required: true })
    password: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: false, default: null })
    email_verified_at: Date | null;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }], ref: 'Student', default: [] })
    students: mongoose.Types.ObjectId[];

    @Prop({ required: false, default: [] })
    fcm_tokens: string[];

    verification_token: string;
}

const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;

export { UserSchema };
