import {forwardRef, Module} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {PrismaService} from "../core/prisma.service";
import {JwtService} from "@nestjs/jwt";
import {AuthModule} from "../auth/auth.module";

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtService],
  imports:[
      forwardRef(() => AuthModule)
  ]
})
export class UserModule {}
