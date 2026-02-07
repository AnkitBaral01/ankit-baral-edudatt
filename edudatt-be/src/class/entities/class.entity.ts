import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { BaseEntity } from "src/common/types/base-entity.type";

@Schema({timestamps: true, collection: 'classes'})
export class Class extends BaseEntity{ 

    @Prop({ required: true })
    name: string;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'School', required: true })
    school: mongoose.Types.ObjectId;

}


const CLassSchema = SchemaFactory.createForClass(Class);
export type ClassDocument = HydratedDocument<Class>;

export { CLassSchema };