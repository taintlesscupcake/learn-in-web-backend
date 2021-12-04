import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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
      body.level,
    );
  }

  @Put('')
  update(@Body() body) {
    return this.postService.updatePost(
      body.token,
      body.id,
      body.title,
      body.privat,
      body.explain,
      body.example,
      body.testinput,
      body.testoutput,
      body.level,
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

  @Get('/difficulty/:level')
  getPostByDifficulty(@Param('level') level) {
    return this.postService.getPostbyLevel(level);
  }

  @Delete('')
  deletePost(@Body() body) {
    return this.postService.deletePost(body.token, body.id);
  }

  @Post('/like/:id')
  likePost(@Body() body, @Param('id') id) {
    return this.postService.likePost(body.token, id);
  }

  @Post('/comment/:id')
  createComment(@Body() body, @Param('id') id) {
    return this.postService.commentPost(body.token, id, body.comment);
  }

  @Delete('/comment/:id')
  deleteComment(@Body() body, @Param('id') id) {
    return this.postService.deleteComment(body.token, id);
  }

  @Get('/comment/:id')
  getComments(@Param('id') id) {
    return this.postService.getComments(id);
  }
}
