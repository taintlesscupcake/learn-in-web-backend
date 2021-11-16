import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { RunnerController } from './runner.controller';
import { RunnerService } from './runner.service';

@Module({
  imports: [PrismaModule],
  controllers: [RunnerController],
  providers: [RunnerService],
})
export class RunnerModule {}
