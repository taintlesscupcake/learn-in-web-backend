import { Body, Controller, Post } from '@nestjs/common';
import { RunnerService } from './runner.service';

@Controller('runner')
export class RunnerController {
  constructor(private readonly runnerService: RunnerService) {}

  @Post('')
  async run(@Body() body) {
    return this.runnerService.run(body);
  }
}
