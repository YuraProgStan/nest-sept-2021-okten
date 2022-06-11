import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {PostService} from "./post.service";
import {CreatePostDto} from "./dto/create-post.dto";
import {PostUpdateDto} from "./dto/post-update.dto";
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags('posts')
@Controller('posts')
export class PostController {

    constructor(private postService: PostService) {
    }

    @ApiOperation({summary: 'Get all posts'})
    @ApiOkResponse({
        status: 200, schema: {
            example: [
                {
                    id: 1,
                    title: 'My title2',
                    content: 'My content',
                    published: false,
                    authorId: 1
                },
                {
                    id: 2,
                    title: 'My title3',
                    content: 'My content3',
                    published: false,
                    authorId: 2
                },
            ]
        }
    })
    @HttpCode(HttpStatus.OK)
    @Get()
    getAll() {
        return this.postService.getAllPosts()
    }

    @ApiOperation({summary: 'Get one post'})
    @ApiOkResponse({
        status: 200, schema: {
            example: {
                id: 1,
                title: 'My title2',
                content: 'My content',
                published: false,
                authorId: 1
            }
        }
    })
    @HttpCode(HttpStatus.OK)
    @Get('/:id')
    getById(@Param('id') id: string) {
        return this.postService.getOneById(id);
    }


    @ApiOperation({summary: 'Create  post'})
    @ApiOkResponse({
        status: 201, schema: {
            example: {
                id: 1,
                title: 'My title2',
                content: 'My content',
                published: false,
                authorId: 1
            }
        }
    })
    @HttpCode(HttpStatus.CREATED)
    @Post()
    createPost(@Body() postDto: CreatePostDto) {
        return this.postService.createPost(postDto)
    }

    @ApiOperation({summary: 'Delete post'})
    @ApiOkResponse({
        status: 200, schema: {
            example: {
                id: 1,
                title: 'My title2',
                content: 'My content',
                published: false,
                authorId: 1
            }
        }
    })
    @HttpCode(HttpStatus.OK)
    @Delete('/:id')
    delete(@Param('id') id: string) {
        return this.postService.deletePost(id);
    }

    @ApiOperation({summary: 'Update post'})
    @ApiOkResponse({
        status: 200, schema: {
            example: {
                id: 1,
                title: 'My title2',
                content: 'My content',
                published: false,
                authorId: 1
            }
        }
    })
    @HttpCode(HttpStatus.OK)
    @Put('/:id')
    updatePost(@Body() postUpdateDto: PostUpdateDto, @Param('id') id: string,) {
        return this.postService.updatePost(postUpdateDto, id);
    }
}
