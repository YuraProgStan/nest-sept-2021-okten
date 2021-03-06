import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UserService} from "./user.service";
import {UpdateUserDto} from "./dto/update-user.dto";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    getAll(){
        return this.userService.getAll()
    }

    @HttpCode(HttpStatus.OK)
    @Get('/:id')
    getOneUserById(@Param('id') id: string) {
        return this.userService.getOneById(id);
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    createUser(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @HttpCode(HttpStatus.OK)
    @Delete('/:id')
    delete(@Param('id')id: string){
        return this.userService.delete(id)
    }

    @HttpCode(HttpStatus.OK)
    @Patch('/:id')
    updateUser(@Param('id')id: string,@Body() updateDto: UpdateUserDto) {
        return this.userService.updateUser(id,updateDto);
    }


}
