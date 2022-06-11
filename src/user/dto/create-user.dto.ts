import {IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsString, Length, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        example: "Sergiy", description: 'name'
    })
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

    @ApiProperty({
        example: 20, description: 'age'
    })
    @IsNumber()
    @Min(16)
    public age: number;

    @ApiProperty({
        example: 'Kyiv', description: 'city'
    })
    @IsString()
    public city: string;

    @ApiProperty({
        example: 'asd3425432', description: 'password'
    })
    @IsString()
    @Length(3,10)
    @IsNotEmpty()
    readonly password: string;

    @ApiProperty({
        example: true, description: 'status'
    })
    @IsBoolean()
    public status: boolean;
}