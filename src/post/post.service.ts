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
    difficulty: number,
  ) {
    const user = await this.auth.validateUser(
      (
        await this.auth.getUserFromToken(token)
      ).id,
    );
    let level: Level;
    if (difficulty == 1) {
      level = 'LOW';
    } else if (difficulty == 2) {
      level = 'MEDIUM';
    } else {
      level = 'HIGH';
    }
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
        level: level,
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
    const user = await this.auth.getUserFromToken(token);
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
      include: {
        author: {
          select: {
            name: true,
          },
        },
        comments: {
          select: {
            content: true,
            author: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    const likes = await this.prisma.postLike.count({
      where: {
        postId: num,
      },
    });
    const returndata = {
      ...post,
      likes: likes,
    };
    return returndata;
  }

  async getPostLike(id: number) {
    const likes = await this.prisma.postLike.count({
      where: {
        postId: id,
      },
    });
    return likes;
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

  async updatePost(
    token: string,
    id: number,
    title: string,
    privat: boolean,
    explain: string,
    example: string,
    testinput: string[],
    testoutput: string[],
    difficulty: number,
  ) {
    const user = await this.auth.getUserFromToken(token);
    let level: Level;
    if (difficulty == 1) {
      level = 'LOW';
    } else if (difficulty == 2) {
      level = 'MEDIUM';
    } else {
      level = 'HIGH';
    }
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
        level: level,
      },
    });
    return post;
  }

  async deletePost(token: string, id: number) {
    const user = await this.auth.getUserFromToken(token);
    const post = await this.prisma.post.delete({
      where: {
        id: id,
      },
    });
    return post;
  }

  async likePost(token: string, id: number) {
    const num = +id;
    const user = await this.auth.getUserFromToken(token);
    if (
      await this.prisma.postLike.count({
        where: {
          postId: num,
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
    return await this.getPostLike(id);
  }

  async commentPost(token: string, id: number, content: string) {
    const num = +id;
    const user = await this.auth.getUserFromToken(token);
    const post = await this.prisma.comment.create({
      data: {
        post: {
          connect: {
            id: num,
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
    const user = await this.auth.getUserFromToken(token);
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
  async searchPost(search: string) {
    const query: string = search.split(' ').join(' | ');
    const posts = await this.prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              search: query,
            },
          },
          {
            explain: {
              search: query,
            },
          },
          {
            example: {
              search: query,
            },
          },
        ],
      },
      orderBy: {
        postlikes: {
          _count: 'desc',
        },
      },
    });
    return posts;
  }
}
