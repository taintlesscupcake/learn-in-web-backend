import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'nestjs-prisma';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { RunnerService } from './runner/runner.service';
import { RunnerController } from './runner/runner.controller';
import { RunnerModule } from './runner/runner.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [PrismaModule, AuthModule, RunnerModule, PostModule],
  controllers: [AppController, RunnerController],
  providers: [AppService, PrismaService, RunnerService],
})
export class AppModule {}
