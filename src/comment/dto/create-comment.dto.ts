import {IsBoolean, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateCommentDto {

    @IsString()
    @IsNotEmpty()
   text;

    @IsBoolean()
   published;

    @IsNumber()
   authorId;

    @IsNumber()
   postId;
}