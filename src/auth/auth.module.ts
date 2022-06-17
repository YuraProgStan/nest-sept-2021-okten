import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {JwtModule, JwtService} from "@nestjs/jwt";
import {UserModule} from "../user/user.module";
import {UserService} from "../user/user.service";
import {PrismaService} from "../core/prisma.service";
import {FileUploadAwsService} from "../fileupload-aws/fileupload-aws.service";
import {FileUploadCloudinaryService} from "../fileupload-cloudinary/fileupload-cloudinary.service";

@Module({
  providers: [AuthService, UserService, PrismaService,FileUploadAwsService,FileUploadCloudinaryService,],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UserModule),
      JwtModule.register({
        secret: process.env.PRIVATE_KEY || 'Secret',
        signOptions:{
          expiresIn: '24h'
        }
      })
  ],
  exports: [AuthService]
})
export class AuthModule {}
