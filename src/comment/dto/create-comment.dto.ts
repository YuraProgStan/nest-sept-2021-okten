import {IsBoolean, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateCommentDto {
    @IsString()
    @IsNotEmpty()
   public text;

    @IsBoolean()
  public published;

    @IsNumber()
  public authorId;

    @IsNumber()
 public  postId;
}