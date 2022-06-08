import {Injectable} from '@nestjs/common';
import {PrismaService} from "../core/prisma.service";
import {Prisma, Post} from '@prisma/client';

@Injectable()
export class PostService {
    constructor(private prismaService: PrismaService) {
    }

    getAllPosts(): Promise<Post[]> {
        return this.prismaService.post.findMany();
    }

    getOneById(postId: string): Promise<Post> {
        return this.prismaService.post.findUnique({
            where: {id: Number(postId)},
            include: {comments: true}
        })
    }

    createPost(data: Prisma.PostCreateInput): Promise<Post> {
        return this.prismaService.post.create({data});
    }


    updatePost(postData: Prisma.PostUpdateInput, postId: string): Promise<Post> {
        return this.prismaService.post.update(
            {
                where: {id: Number(postId)},
                data: {
                    title: postData.title,
                    content: postData.content,
                    published: postData.published,
                    authorId: postData.authorId
                }
            }
        )
    }

    deletePost(postId: string): Promise<Post> {
        return this.prismaService.post.delete({
            where: {id: Number(postId)}
        })
    }
}
