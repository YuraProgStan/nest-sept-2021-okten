import {IsNotEmpty, IsNumber, IsOptional, IsString, Length, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiProperty({
        example: "Sergiy", description: 'name'
    })
    @IsString()
    @Length(2,10)
    @IsOptional()
    public name: string;

    @IsOptional()
    @ApiProperty({
        example: 20, description: 'age'
    })
    public age: string;

    @IsOptional()
    @ApiProperty({
        example: 'Kyiv', description: 'city'
    })

    @IsOptional()
    @IsString()
    public city: string;

    public avatar: string;
}