import {IsBoolean, IsNotEmpty, IsString} from "class-validator";

export class UpdateCommentDto {
    @IsString()
    @IsNotEmpty()
    text;

    @IsBoolean()
    published;

}