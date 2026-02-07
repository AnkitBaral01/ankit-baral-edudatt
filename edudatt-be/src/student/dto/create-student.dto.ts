import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsDate, IsEnum, IsMongoId } from "class-validator";
import { Type } from "class-transformer";
import * as mongoose from "mongoose";
import { Genders } from "src/common/enums/gender.enums";

export class SearchStudentDto{
    @ApiProperty({ example: "John", description: "First name of the student" })
    @IsString()
    @IsNotEmpty()
    first_name: string;

    @ApiProperty({ example: "Doe", description: "Last name of the student" })
    @IsString()
    @IsNotEmpty()
    last_name: string;

    @ApiProperty({ example: "2005-06-15", description: "Date of birth in YYYY-MM-DD format" })
    @IsDate()
    @Type(() => Date)
    @IsNotEmpty()
    date_of_birth: Date;

    @ApiProperty({ example: "65a1234b567c8d9e0f1a2b34", description: "School ID (MongoDB ObjectId)" })
    @IsMongoId()
    @IsNotEmpty()
    school: mongoose.Types.ObjectId;

    @ApiProperty({ example: "65a1234b567c8d9e0f1a2b34", description: "Class ID (MongoDB ObjectId)" })
    @IsMongoId()
    @IsNotEmpty()
    class: mongoose.Types.ObjectId;
}


export class CreateStudentDto extends SearchStudentDto{

    @ApiProperty({ example: "male", enum: Genders, description: "Gender of the student" })
    @IsEnum(Genders)
    @IsNotEmpty()
    gender: Genders;

}