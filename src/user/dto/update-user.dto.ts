import {IsNotEmpty, IsNumber, IsString, Length, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUserDto {
    @ApiProperty({
        example: "Sergiy", description: 'name'
    })
    @IsString()
    @Length(2,10)
    @IsNotEmpty()
    public name: string;

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
}