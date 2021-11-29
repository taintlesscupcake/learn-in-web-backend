import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { AuthService } from 'src/auth/auth.service';
import { Level } from '.prisma/client';

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
    explain: string,
    example: string,
    testinput: string[],
    testoutput: string[],
  ) {
    const user = await this.auth.validateUser(
      (
        await this.auth.getUserFromToken(token)
      ).id,
    );
    const post = await this.prisma.post.create({
      data: {
        author: {
          connect: {
            id: user.id,
          },
        },
        title: title,
        private: privat,
        explain: explain,
        example: example,
        testinput: testinput,
        testoutput: testoutput,
      },
    });
    return post;
  }

  async getAll() {
    const posts = await this.prisma.post.findMany();
    return posts;
  }

  async getPosts(take: number) {
    const posts = await this.prisma.post.findMany({
      take: take,
      orderBy: {
        postlikes: {
          _count: 'desc',
        },
      },
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

  async getPost(id: number) {
    const num = +id;
    const post = await this.prisma.post.findUnique({
      where: { id: num },
    });
    return post;
  }

  async updatePost(
    token: string,
    id: number,
    title: string,
    privat: boolean,
    explain: string,
    example: string,
    testinput: string[],
    testoutput: string[],
  ) {
    const user = await this.auth.validateUser(token);
    const post = await this.prisma.post.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        private: privat,
        explain: explain,
        example: example,
        testinput: testinput,
        testoutput: testoutput,
      },
    });
    return post;
  }

  async deletePost(token: string, id: number) {
    const user = await this.auth.validateUser(token);
    const post = await this.prisma.post.delete({
      where: {
        id: id,
      },
    });
    return post;
  }

  async likePost(token: string, id: number) {
    const user = await this.auth.validateUser(token);
    if (
      await this.prisma.postLike.count({
        where: {
          postId: id,
          userId: user.id,
        },
      })
    ) {
      return {
        message: 'You already liked this post',
      };
    }
    const post = await this.prisma.postLike.create({
      data: {
        post: {
          connect: {
            id: id,
          },
        },
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });
    return post;
  }

  async commentPost(token: string, id: number, content: string) {
    const user = await this.auth.validateUser(token);
    const post = await this.prisma.comment.create({
      data: {
        post: {
          connect: {
            id: id,
          },
        },
        author: {
          connect: {
            id: user.id,
          },
        },
        content: content,
      },
    });
    return post;
  }

  async deleteComment(token: string, id: string) {
    const user = await this.auth.validateUser(token);
    const comment = await this.prisma.comment.delete({
      where: {
        id: id,
      },
    });
    return comment;
  }

  async getComments(id: number) {
    const comments = await this.prisma.comment.findMany({
      where: {
        postId: id,
      },
    });
    return comments;
  }

  async getPostbyLevel(difficulty: number) {
    let level: Level;
    if (difficulty == 1) {
      level = 'LOW';
    } else if (difficulty == 2) {
      level = 'MEDIUM';
    } else {
      level = 'HIGH';
    }
    const posts = await this.prisma.post.findMany({
      where: {
        level: level,
      },
    });
    return posts;
  }
}
