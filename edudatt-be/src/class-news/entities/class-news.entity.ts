import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { BaseEntity } from "src/common/types/base-entity.type";


@Schema ({timestamps: true, collection: 'class-news'})
export class ClassNews extends BaseEntity { 

    @Prop({ required: true })
    heading: string;

    @Prop({ required: true })
    content: string;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'Class', required: true })
    class: mongoose.Types.ObjectId;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'School', required: true })
    school: mongoose.Types.ObjectId;


    @Prop({ required: true, default: false })
    is_reminder: boolean;

    @Prop({ required: true, default: false })
    is_achievement: boolean;

}

const ClassNewSchema = SchemaFactory.createForClass(ClassNews);
export type ClassNewDocument = HydratedDocument<ClassNews>;

export { ClassNewSchema };