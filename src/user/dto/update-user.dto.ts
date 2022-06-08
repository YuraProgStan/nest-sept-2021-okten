import {IsNotEmpty, IsNumber, IsString, Length, Min} from "class-validator";

export class UpdateUserDto {

    @IsString()
    @Length(2,10)
    @IsNotEmpty()
    public name: string;

    @IsNumber()
    @Min(16)
    public age: number;

    @IsString()
    public city: string;
}