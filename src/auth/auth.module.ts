import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'nestjs-prisma';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { RunnerService } from 'src/runner/runner.service';

@Module({
  imports: [PrismaModule, JwtModule.register({ secret: 'secret' })],
  controllers: [AuthController],
  providers: [AuthService, RunnerService, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
