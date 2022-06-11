import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import { Observable } from 'rxjs';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {
    }
   canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        try{

            const authHeader = request.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];
            if(bearer !== 'Bearer' || !token){

                throw new UnauthorizedException({message: 'user is not auth'})
            }

            // const user = this.verifyToken(token);
            const user = this.jwtService.verify(token, {publicKey:'Secret'});
            request.user = user;
            return true
        }catch (err){
            throw new UnauthorizedException({message: 'user is not auth'})
        }
    }

    // private async verifyToken(token: string): Promise<boolean> {
    //     const user = await this.jwtService.verify(token);
    //     console.log(user)
    //     return user;
    // }
}