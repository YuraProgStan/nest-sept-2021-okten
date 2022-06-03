import {Injectable} from '@nestjs/common';
import {PostCreateDto} from "./dto/post-create.dto";
import {PostUpdateDto} from "./dto/post-update.dto";

@Injectable()
export class PostService {
    private posts = []

    getAll() {
        return this.posts;
    }

    getById(id: string){
        return this.posts.find(item => item.id === +id)
    }

    create(postDto: PostCreateDto) {
        this.posts.push({
            id: Date.now(),
            ...postDto
        })
        return postDto;
    }

   delete (id: string){
        const findIndex = this.posts.findIndex(item => item.id = +id);
        this.posts = this.posts.splice(findIndex, 1);
        return 'Post has been deleted'
   }

    update (id: string, postDto: PostUpdateDto){
        const findIndex = this.posts.findIndex(item => item.id = +id);
        this.posts[findIndex] = {id, ...postDto};
        return this.posts[findIndex];
    }
}
