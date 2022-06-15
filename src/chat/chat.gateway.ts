import {SubscribeMessage, WebSocketGateway, WebSocketServer} from "@nestjs/websockets";
import {Server, Socket} from "socket.io";
import {AuthService} from "../auth/auth.service";

@WebSocketGateway({
    pingTimeout: 60*60
})

export class ChatGateway{
    @WebSocketServer()
    server: Server

    constructor(
        private readonly authService: AuthService,
    ) {

    }

    @SubscribeMessage('join')
    async joinRoom(client: Socket,data: {token: string, data}){
        console.log(data.data.message);
        const userId = await  this.authService.getVerifiedUserId(data.token);
        if(!userId){
            client.emit('user-no-auth',{
                statusCode: 401,
                error: 'No auth'
            })
            // throw new UnauthorizedException({
            //     message: 'not auth'
            // })
        }
        console.log(userId);

        // return 'Success'
        client.emit('new-user', {
            statusCode: 200,
            message: `User has been connected with id = ${userId}`
        })
    }
}