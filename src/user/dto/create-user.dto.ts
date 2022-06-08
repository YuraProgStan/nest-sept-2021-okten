import {IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString, Length, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {

    @IsString()
    @Length(2,10)
    @IsNotEmpty()
    public name: string;

    @ApiProperty({
        example: "user@gmail.com", description: 'email'
    })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsNumber()
    @Min(16)
    public age: number;

    @IsString()
    public city: string;

    @IsString()
    @Length(3,10)
    readonly password: string;

    @IsBoolean()
    public status: boolean;
}