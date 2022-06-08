import {IsBoolean, IsNotEmpty, IsNumber, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateCommentDto {

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

    @IsNumber()
  public authorId;

    @IsNumber()
 public  postId;
}