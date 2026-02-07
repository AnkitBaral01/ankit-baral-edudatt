import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Class } from "src/class/entities/class.entity";
import { Genders } from "src/common/enums/gender.enums";
import { BaseEntity } from "src/common/types/base-entity.type";
import { School } from "src/school/entities/school.entity";

@Schema({timestamps: true, collection: 'students'})
export class Student extends BaseEntity { 

    @Prop({ required: true })
    first_name: string;

    @Prop({ required: true })
    last_name: string;

    @Prop({ required: true })
    date_of_birth: Date;

    @Prop({ type: String, required: true })
    gender: Genders;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true })
    school: School;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: false, default: null })
    class?: Class;

}

const StudentSchema = SchemaFactory.createForClass(Student);
export type StudentDocument = HydratedDocument<Student>;

export { StudentSchema };
