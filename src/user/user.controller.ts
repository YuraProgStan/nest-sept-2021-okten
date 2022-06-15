import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Put, Res, UploadedFile,
    UseGuards, UseInterceptors
} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UserService} from "./user.service";
import {UpdateUserDto} from "./dto/update-user.dto";
import {ApiOkResponse, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "@prisma/client";
import {AuthGuard} from "../auth/jwt-auth.guard";
import {MiddlewareRequestInterface} from "../auth/interface/middleware-request.interface";
import {FileInterceptor} from "@nestjs/platform-express";
import {diskStorage} from "multer";
import {imageFileFilter} from "../utils/image.filter";
import {watchFile} from "fs";
import {FileUploadAwsService} from "../fileupload-aws/fileupload-aws.service";

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
    @UseInterceptors(
        FileInterceptor('avatar',{fileFilter: imageFileFilter})
    )
    updateUser(
        @Body() updateDto: UpdateUserDto,
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File)
    {
        try {
            return this.userService.updateUser(updateDto, id, file);
        } catch (e) {
            console.log(e)
        }

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

    @Get('avatar/:image')
    watchFile(@Param('image') image, @Res() res) {
        return res.sendFile(image, {root: './avatars'});
    }
}


// const randomName = Array(32)
//   .fill(null)
//   .map(() => Math.round(Math.random() * 16).toString(16))
//   .join('');