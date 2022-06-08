import {IsBoolean, IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateCommentDto {
    @ApiProperty({
        example: "My text", description: 'text'
    })
    @IsString()
    @IsNotEmpty()
    public text;

    @ApiProperty({
        example: true, description: 'published'
    })
    @IsBoolean()
    public published;

}