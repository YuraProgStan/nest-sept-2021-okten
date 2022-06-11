import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {CommentService} from "./comment.service";
import {CreateCommentDto} from "./dto/create-comment.dto";
import {UpdateCommentDto} from "./dto/update-comment.dto";
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags ('comments')
@Controller('comments')
export class CommentController {
    constructor(private commentService: CommentService) {
    }


    @ApiOperation({summary: 'Get all comments'})
    @ApiOkResponse({status: 200, schema:{
            example:[
                {
                text: 'My text',
                published: false,
                authorId: 1,
                postId: 1
            },
                {
                    text: 'My text2',
                    published: false,
                    authorId: 2,
                    postId: 2
                },
            ]
        }})
    @Get()
    getAll(){
        return this.commentService.getAllComments()
    }

    @ApiOperation({summary: 'Get one comment'})
    @ApiOkResponse({status: 200, schema:{
            example:{
                text: 'My text',
                published: false,
                authorId: 1,
                postId: 1
            }
        }})
    @HttpCode(HttpStatus.OK)
    @Get('/:id')
    getOneCommentById(@Param('id') id:string){
        return this.commentService.getOneById(id)
    }

    @ApiOperation({summary: 'Create one comment'})
    @ApiOkResponse({status: 201, schema:{
            example:{
                text: 'My text',
                published: false,
                authorId: 1,
                postId: 1
            }
        }})
    @HttpCode(HttpStatus.CREATED)
    @Post()
    createComment(@Body() commentDto: CreateCommentDto){
        return this.commentService.createComment(commentDto)
    }


    @ApiOperation({summary: 'Update one comment'})
    @ApiOkResponse({status: 200, schema:{
            example:{
                text: 'My new text',
                published: false,
                authorId: 1,
                postId: 1
            }
        }})
    @Put('/:id')
    updateComment(@Body() updateDto: UpdateCommentDto, @Param('id')id: string){
        return this.commentService.updateComment(updateDto, id)
    }

    @ApiOperation({summary: 'Delete one comment'})
    @ApiOkResponse({status: 200, schema:{
            example:{
                text: 'My new text',
                published: false,
                authorId: 1,
                postId: 1
            }
        }})
    @HttpCode(HttpStatus.OK)
    @Delete('/:id')
    delete(@Param('id')id: string){
        return this.commentService.deleteComment(id)
    }
}
