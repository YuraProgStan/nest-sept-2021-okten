import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {PrismaService} from "../core/prisma.service";

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  imports:[]
})
export class UserModule {}
