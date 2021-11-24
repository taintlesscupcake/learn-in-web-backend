import { Body, Controller, Delete, Post } from '@nestjs/common';
import { PostService } from './post.service';
@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('')
  create(@Body() body) {
    return this.postService.createPost(
      body.token,
      body.title,
      body.privat,
      body.content,
    );
  }

  @Delete('')
  delete(@Body() body) {
    return this.postService.deletePost(body.token, body.id);
  }

  @Post('/like')
  like(@Body() body) {
    return this.postService.likePost(body.token, body.id);
  }
}
