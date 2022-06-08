import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {CommentService} from "./comment.service";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {UpdateCommentDto} from "./dto/update-comment.dto";
import {ApiTags} from "@nestjs/swagger";

@Controller('comments')
export class CommentController {
    constructor(private commentService: CommentService) {
    }

    @ApiTags ('comments')
    @Get()
    getAll(){
        return this.commentService.getAllComments()
    }

    @HttpCode(HttpStatus.OK)
    @Get('/:id')
    getOneCommentById(@Param('id') id:string){
        return this.commentService.getOneById(id)
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    createComment(@Body() commentDto: CreateCommentDto){
        return this.commentService.createComment(commentDto)
    }

    @Put('/:id')
    updateComment(@Body() updateDto: UpdateCommentDto, @Param('id')id: string){
        return this.commentService.updateComment(updateDto, id)
    }

    @HttpCode(HttpStatus.OK)
    @Delete('/:id')
    delete(@Param('id')id: string){
        return this.commentService.deleteComment(id)
    }
}
