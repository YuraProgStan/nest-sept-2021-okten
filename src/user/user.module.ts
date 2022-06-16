import {forwardRef, Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {PrismaService} from "../core/prisma.service";
import {JwtService} from "@nestjs/jwt";
import {AuthModule} from "../auth/auth.module";
import {FileUploadAwsService} from "../fileupload-aws/fileupload-aws.service";
import {FileUploadAwsModule} from "../fileupload-aws/fileupload-aws.module";
import {FileUploadCloudinaryModule} from "../fileupload-cloudinary/fileupload-cloudinary.module";
import {FileUploadCloudinaryService} from "../fileupload-cloudinary/fileupload-cloudinary.service";

@Module({
    controllers: [UserController],
    imports: [
        forwardRef(() => AuthModule),
        FileUploadAwsModule,
        FileUploadCloudinaryModule
    ],
    providers: [UserService, PrismaService, JwtService, FileUploadAwsService, FileUploadCloudinaryService],

})
export class UserModule {
}
