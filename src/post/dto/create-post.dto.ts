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


    @ApiProperty({
        example: true, description: 'published'
    })
    @IsBoolean()
    public   published: boolean;

    @ApiProperty({
        example: 2, description: 'authorId'
    })
    @IsNumber()
    @IsNotEmpty()
    public authorId: number;
}