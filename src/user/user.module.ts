import {forwardRef, Module} from '@nestjs/common';
import {UserController} from './user.controller';
import {UserService} from './user.service';
import {PrismaService} from "../core/prisma.service";
import {JwtService} from "@nestjs/jwt";
import {AuthModule} from "../auth/auth.module";
import {FileUploadAwsService} from "../fileupload-aws/fileupload-aws.service";
import {FileUploadAwsModule} from "../fileupload-aws/fileupload-aws.module";

@Module({
    controllers: [UserController],
    imports: [
        forwardRef(() => AuthModule),
        FileUploadAwsModule
    ],
    providers: [UserService, PrismaService, JwtService, FileUploadAwsService],

})
export class UserModule {
}
