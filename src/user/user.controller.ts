import {Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UserService} from "./user.service";
import {UpdateUserDto} from "./dto/update-user.dto";
import {ApiOkResponse, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "@prisma/client";

@Controller('users')
export class UserController {
    constructor(private userService: UserService) {
    }

    @ApiTags ('users')
    @HttpCode(HttpStatus.OK)
    @Get()
    getAll(){
        return this.userService.getAllUsers()
    }

    @ApiOperation({summary: 'Get one user'})
    @ApiOkResponse({status: 200, schema:{
        example:{
            id: 1,
            name: 'Olga',
            email: 'olga@gmail.com',
            age: 25,
            city: 'NewYork',
            password: '1234567',
            status: true
        }
        } })
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
        return this.userService.deleteUser(id)
    }

    @HttpCode(HttpStatus.OK)
    @Put('/:id')
    updateUser(@Body() updateDto: UpdateUserDto, @Param('id')id: string) {
        return this.userService.updateUser(updateDto, id);
    }
}
