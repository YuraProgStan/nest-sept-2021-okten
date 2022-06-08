import {Injectable} from '@nestjs/common';
import {PrismaService} from "../core/prisma.service";
import { Prisma, User } from '@prisma/client';

@Injectable()
export class UserService {
constructor(private prismaService: PrismaService) {
}

    getAllUsers():Promise<User[]> {
        return this.prismaService.user.findMany();
    }

    getOneById(userId: string): Promise<User> {
        return this.prismaService.user.findUnique({
            where:{id:Number(userId)},
            include:{posts:true}
        })
    }

    createUser(data: Prisma.UserCreateInput): Promise<User> {
       return  this.prismaService.user.create({data})
    }

    updateUser(userData: Prisma.UserUpdateInput, userId: string): Promise<User> {

        return this.prismaService.user.update
        ({
            where: {id: Number(userId)},
            data: {name: userData.name, city:userData.city, age:userData.age}
        });
    }

    // delete(id: string) {
    //     const userIndex = this.users.findIndex(item => item.id === +id)
    //     this.users.splice(userIndex, 1);
    //     return "User has been deleted"
    // }



}
