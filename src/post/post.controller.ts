import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put} from '@nestjs/common';
import {PostService} from "./post.service";
import {PostCreateDto} from "./dto/post-create.dto";
import {PostUpdateDto} from "./dto/post-update.dto";

@Controller('posts')
export class PostController {

    constructor(private postService: PostService) {
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    getAll(){
        return this.postService.getAll()
    }

    @HttpCode(HttpStatus.OK)
    @Get('/:id')
    getById(@Param('id') id:string){
        return this.postService.getById(id);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body() postDto: PostCreateDto){
        return this.postService.create(postDto)
    }

    @HttpCode(HttpStatus.OK)
    @Delete('/:id')
    delete(@Param('id') id:string){
        return this.postService.delete(id);
    }

    @HttpCode(HttpStatus.OK)
    @Put('/:id')
    updateById(@Param('id') id:string, @Body() postUpdateDto: PostUpdateDto){
        return this.postService.update(id,postUpdateDto);
    }
}
