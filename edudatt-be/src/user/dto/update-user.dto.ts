import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString } from "class-validator";

export class UpdateUserDto extends PartialType(CreateUserDto) { }


export class UpdatePasswordDto{

    @ApiProperty({ description: 'The old password of the user' })
    @IsString()
    old_password: string;

    @ApiProperty({ description: 'The new password of the user' })
    @IsString()
    new_password: string;

    @ApiProperty({ description: 'The confirmation of the new password' })
    @IsString()
    confirm_password: string;

}


export class ForgotPasswordDto{

    @ApiProperty({ description: 'The email of the user' })
    @IsString()
    email: string;

}

export class ResetPasswordDto{

    @ApiProperty({ description: 'Reset Password Token' })
    @IsString()
    verification_token: string;

    @ApiProperty({ description: 'The new password of the user' })
    @IsString()
    new_password: string;

    @ApiProperty({ description: 'The confirmation of the new password' })
    @IsString()
    confirm_password: string;

}