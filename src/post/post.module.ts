import { Module } from '@nestjs/common';
import { PrismaModule, PrismaService } from 'nestjs-prisma';
import { AuthModule } from 'src/auth/auth.module';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [PostController],
  providers: [PostService, PrismaService],
  exports: [PostService],
})
export class PostModule {}
