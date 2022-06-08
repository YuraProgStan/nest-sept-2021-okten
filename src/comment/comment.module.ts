import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import {PrismaService} from "../core/prisma.service";
import {CommentController} from "./comment.controller";

@Module({
  controllers:[CommentController],
  providers: [CommentService, PrismaService]
})
export class CommentModule {}
