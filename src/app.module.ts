import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'nestjs-prisma';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { Auth } from './auth';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, Auth],
})
export class AppModule {}
