import {Injectable} from '@nestjs/common';
import {PrismaService} from "../core/prisma.service";
import {Post, Prisma, User} from '@prisma/client';
import {UpdateUserDto} from "./dto/update-user.dto";
import {FileUploadAwsService} from "../fileupload-aws/fileupload-aws.service";
import {FileUploadCloudinaryService} from "../fileupload-cloudinary/fileupload-cloudinary.service";

@Injectable()
export class UserService {
constructor(private prismaService: PrismaService, private fileUploadAwsService:FileUploadAwsService, private fileUploadCloudinaryService:FileUploadCloudinaryService) {
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

    getUserByEmail(userEmail: string): Promise<User>{
    return this.prismaService.user.findFirst({
        where: {email: userEmail}
    })
    }

    createUser(data: Prisma.UserCreateInput): Promise<User> {
       return  this.prismaService.user.create({data})
    }

    async updateUser(userData: UpdateUserDto, userId: string, file) {
        try{
            if(file){
                // const avatarPath = await this.fileUploadAwsService.upload(file, 'avatar', userId) //aws
                const avatarPath = await this.fileUploadCloudinaryService.upload(file, 'avatar', userId); //cloudinary
                console.log(avatarPath);
                return this.prismaService.user.update({
                    where: {id: Number(userId)},
                    data: {name: userData.name, city: userData.city, age: Number(userData.age), avatar: avatarPath}
                });
            }
        }catch (err){
        }
    }
    deleteUser(userId: string): Promise<User>{
    return this.prismaService.user.delete({
        where: {id: Number(userId)},
    })}

}
