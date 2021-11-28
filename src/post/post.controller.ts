import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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
      body.explain,
      body.example,
      body.testinput,
      body.testoutput,
    );
  }

  @Get('')
  getAll() {
    return this.postService.getAll();
  }

  @Get('/some')
  getSome(@Body() body) {
    return this.postService.getPosts(body.take);
  }

  @Get('/id/:id')
  getPost(@Param('id') id) {
    return this.postService.getPost(id);
  }

  @Get('/difficulty/:id')
  getDifficulty(@Param('id') id) {
    return this.postService.getPostbyLevel(id);
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
