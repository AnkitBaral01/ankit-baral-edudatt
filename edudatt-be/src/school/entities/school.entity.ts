import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { BaseEntity } from "src/common/types/base-entity.type";

class SchoolAddress {
    @Prop({ required: true })
    street: string;

    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    state: string;

    @Prop({ required: true })
    zip: string;

    @Prop({ required: true })
    country: string;
}

@Schema({timestamps: true, collection: 'schools'})
export class School extends BaseEntity{

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    address: SchoolAddress;

    @Prop({ required: true })
    phone_number: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    website: string;

    // @Prop({ required: true, default: '' })
    // logo: string;
}


const SchoolSchema = SchemaFactory.createForClass(School);
export type SchoolDocument = HydratedDocument<School>;

export { SchoolSchema };