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

    @ApiProperty({
        example: 2, description: 'authorId'
    })
    @IsNumber()
  public authorId;

    @ApiProperty({
        example: 3, description: 'postId'
    })
    @IsNumber()
 public  postId;
}