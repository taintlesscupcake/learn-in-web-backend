import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post('signup')
  signUp(@Body() body) {
    return this.AuthService.createUser(body.name, body.email, body.password);
  }

  @Post('signin')
  signIn(@Body() body) {
    return this.AuthService.login(body.email, body.password);
  }

  @Post('refresh')
  refresh(@Body() body) {
    return this.AuthService.refreshTokens(body.token);
  }

  @Post('validate')
  validate(@Body() body) {
    return this.AuthService.getUserFromToken(body.token);
  }
}
