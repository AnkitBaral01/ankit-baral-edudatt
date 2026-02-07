import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class SchoolAddressDto {
    @ApiProperty({ example: "123 Main St" })
    @IsString()
    @IsNotEmpty()
    street: string;

    @ApiProperty({ example: "New York" })
    @IsString()
    @IsNotEmpty()
    city: string;

    @ApiProperty({ example: "NY" })
    @IsString()
    @IsNotEmpty()
    state: string;

    @ApiProperty({ example: "10001" })
    @IsString()
    @IsNotEmpty()
    zip: string;

    @ApiProperty({ example: "USA" })
    @IsString()
    @IsNotEmpty()
    country: string;
}

export class CreateSchoolDto {
    @ApiProperty({ example: "Greenwood High School" })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        type: SchoolAddressDto,
        example: {
            street: "123 Main St",
            city: "New York",
            state: "NY",
            zip: "10001",
            country: "USA",
        },
    })
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => SchoolAddressDto)
    address: SchoolAddressDto;

    @ApiProperty({ example: "+1-234-567-890" })
    @IsString()
    @IsNotEmpty()
    phone_number: string;

    @ApiProperty({ example: "contact@greenwoodschool.com" })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: "https://greenwoodschool.com" })
    @IsString()
    @IsNotEmpty()
    website: string;
}
