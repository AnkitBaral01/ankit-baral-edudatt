import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { BaseEntity } from "src/common/types/base-entity.type";


@Schema({timestamps: true, collection: 'events'})
export class Event extends BaseEntity{ 

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    start_date: Date;

    @Prop({ required: false, default: null })
    end_date: Date | null;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true })
    school: mongoose.Types.ObjectId;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }], ref: 'Class', default: [] })
    classes: mongoose.Types.ObjectId[];

    @Prop({ required: true, default: false })
    is_public: boolean;

}

const EventSchema = SchemaFactory.createForClass(Event);
export type EventDocument = HydratedDocument<Event>;

export { EventSchema };