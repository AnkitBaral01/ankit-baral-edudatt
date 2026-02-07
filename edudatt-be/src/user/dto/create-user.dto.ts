import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsOptional, IsString, Max, MaxLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(50)
    @IsString()
    first_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(50)
    @IsString()
    last_name: string;

    @ApiProperty()
    @IsNotEmpty()
    @MaxLength(50)
    @IsEmail()
    email: string;

    @ApiProperty({ required: false, nullable: true })
    @IsString()
    @IsEmpty()
    mobile_number?: string | null;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    confirm_password: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    fcm_token: string;

}


export class UpdateFCMTokenDto{

    @ApiProperty()
    @IsString()
    fcm_token: string;

}