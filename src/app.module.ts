import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';
import { CommentController } from './comment/comment.controller';
import { CommentModule } from './comment/comment.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { FileUploadAwsModule } from './fileupload-aws/fileupload-aws.module';
import { FileUploadCloudinaryModule } from './fileupload-cloudinary/fileupload-cloudinary.module';


@Module({
  imports: [UserModule, PostModule, CommentModule, AuthModule, ChatModule, FileUploadAwsModule, FileUploadCloudinaryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
