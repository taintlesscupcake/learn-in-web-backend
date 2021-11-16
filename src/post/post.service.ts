import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class PostService {
  constructor(
    private readonly auth: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  async createPost(
    token: string,
    title: string,
    privat: boolean,
    content: string,
  ) {
    const user = await this.auth.validateUser(token);
    const post = await this.prisma.post.create({
      data: {
        author: {
          connect: {
            id: user.id,
          },
        },
        title: title,
        private: privat,
        content: content,
      },
    });
    return post;
  }

  async getPosts(take: number) {
    const posts = await this.prisma.post.findMany({
      take: take,
    });
    return posts;
  }

  async getPostsByUser(token: string, userId: string, take: number) {
    const user = await this.auth.validateUser(token);
    const posts = await this.prisma.post.findMany({
      where: {
        authorId: userId,
      },
      take: take,
    });
    return posts;
  }

  async getPost(id: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    return post;
  }

  async updatePost(
    token: string,
    id: string,
    title: string,
    privat: boolean,
    content: string,
  ) {
    const user = await this.auth.validateUser(token);
    const post = await this.prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        private: privat,
        content: content,
      },
    });
    return post;
  }

  async deletePost(token: string, id: string) {
    const user = await this.auth.validateUser(token);
    const post = await this.prisma.post.delete({
      where: {
        id: id,
      },
    });
    return post;
  }
}
