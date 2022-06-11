import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Put,
    UseGuards
} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UserService} from "./user.service";
import {UpdateUserDto} from "./dto/update-user.dto";
import {ApiOkResponse, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "@prisma/client";
import {AuthGuard} from "../auth/jwt-auth.guard";
import {MiddlewareRequestInterface} from "../auth/interface/middleware-request.interface";

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private userService: UserService) {
    }


    @ApiOperation({summary: 'Get all users'})
    @ApiOkResponse({
        status: 200, schema: {
            example:
                [
                    {
                        id: 1,
                        name: 'Olga',
                        email: 'olga@gmail.com',
                        age: 25,
                        city: 'NewYork',
                        password: '1234567',
                        status: false
                    },
                    {
                        id: 2,
                        name: 'Sergiy',
                        email: 'serg@gmail.com',
                        age: 30,
                        city: 'Lviv',
                        password: '1234567fdsg',
                        status: false
                    }
                ]
        }
    })
    @HttpCode(HttpStatus.OK)
    @Get()
    @UseGuards(AuthGuard)
    getAll() {
        return this.userService.getAllUsers()
    }

    @ApiOperation({summary: 'Get one user'})
    @ApiOkResponse({
        status: 200, schema: {
            example: {
                id: 1,
                name: 'Olga',
                email: 'olga@gmail.com',
                age: 25,
                city: 'NewYork',
                password: '1234567',
                status: true
            }
        }
    })
    @HttpCode(HttpStatus.OK)
    @Get('/:id')
    getOneUserById(@Param('id') id: string) {
        return this.userService.getOneById(id);
    }

    // @HttpCode(HttpStatus.CREATED)
    // @Post()
    // createUser(
    //     @Req() req: MiddlewareRequestInterface,
    //     @Body() userDto: CreateUserDto) {
    //     const user = req.user;
    //     return this.userService.createUser(userDto);
    // }

    @ApiOperation({summary: 'Update user'})
    @ApiOkResponse({
        status: 200, schema: {
            example: {
                id: 1,
                name: 'Olga',
                email: 'olga@gmail.com',
                age: 25,
                city: 'NewYork',
                password: '1234567',
                status: true
            }
        }
    })
    @HttpCode(HttpStatus.OK)
    @Put('/:id')
    updateUser(@Body() updateDto: UpdateUserDto, @Param('id') id: string) {
        return this.userService.updateUser(updateDto, id);
    }

    @ApiOperation({summary: 'Delete user'})
    @ApiOkResponse({
        status: 200, schema: {
            example: {
                id: 1,
                name: 'Olga',
                email: 'olga@gmail.com',
                age: 25,
                city: 'NewYork',
                password: '1234567',
                status: true
            }
        }
    })
    @HttpCode(HttpStatus.OK)
    @Delete('/:id')
    delete(@Param('id') id: string) {
        return this.userService.deleteUser(id)
    }
}
