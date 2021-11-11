import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'nestjs-prisma';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  imports: [PrismaModule, JwtModule.register({ secret: 'secret' })],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
