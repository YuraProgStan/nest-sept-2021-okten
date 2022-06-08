import {IsBoolean, IsNotEmpty, IsNumber, IsString, Length} from "class-validator";

export class UpdatePostDto {
    @IsString()
    @Length(2, 100)
    @IsNotEmpty()
    public title : string;

    @IsString()
    @IsNotEmpty()
    public content: string;

    @IsBoolean()
    public   published: boolean;

    @IsNumber()
    public authorId:number

}