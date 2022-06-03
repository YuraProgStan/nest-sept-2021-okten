import {Injectable} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {findIndex} from "rxjs";
import {UpdateUserDto} from "./dto/update-user.dto";

@Injectable()
export class UserService {
    private users = [];

    getAll() {
        return this.users
    }

    getOneById(id: string) {
        return this.users.find(item => item.id === +id)
    }

    createUser(userDto: CreateUserDto) {
        this.users.push({
            ...userDto,
            id: new Date().valueOf(),
        })
        return userDto;
    }

    delete(id: string) {
        const userIndex = this.users.findIndex(item => item.id === +id)
        this.users.splice(userIndex, 1);
        return "User has been deleted"
    }


    updateUser(id: string,userDto: UpdateUserDto) {
        const userIndex = this.users.findIndex(item => item.id === +id);
        this.users[userIndex] = {... this.users[userIndex], ...userDto}
        return this.users[userIndex];
    }
}
