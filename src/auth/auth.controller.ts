import {Body, Controller, Post} from '@nestjs/common';
import {ApiOkResponse, ApiOperation, ApiTags} from "@nestjs/swagger";
import {AuthUserDto} from "./dto/auth-user.dto";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../user/dto/create-user.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @ApiOperation({summary: 'Login user'})
    @ApiOkResponse({status: 200, schema: {
            example: {
                token: 'Bearer 235432dsf/afsdffa'
            }
        }})
    @Post('/login')
    login(@Body() authDto: AuthUserDto) {
        return this.authService.login(authDto)
    }

    @ApiOperation({summary: 'Registration user'})
    @ApiOkResponse({status: 201, schema: {
            example: {
              token: 'Bearer 235432dsf/afsdffa'
            }
        }})
    @Post('/registration')
    registration(@Body() userDto: CreateUserDto){
        return this.authService.registration(userDto)
    }
}
