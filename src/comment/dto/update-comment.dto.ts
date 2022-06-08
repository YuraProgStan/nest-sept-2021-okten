import {IsBoolean, IsNotEmpty, IsString} from "class-validator";

export class UpdateCommentDto {
    @IsString()
    @IsNotEmpty()
    public text;

    @IsBoolean()
    public published;

}