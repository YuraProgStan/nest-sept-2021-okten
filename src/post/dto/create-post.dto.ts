import {IsBoolean, IsNotEmpty, IsNumber, IsString, Length} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreatePostDto {

    @ApiProperty({
        example: "My title", description: 'title'
    })
    @IsString()
    @Length(2, 100)
    @IsNotEmpty()
    public title : string;

    @ApiProperty({
        example: "My some content", description: 'content'
    })
    @IsString()
    @IsNotEmpty()
    public content: string;


    @IsBoolean()
    public   published: boolean;

    @IsNumber()
    @IsNotEmpty()
    public authorId: number;
}