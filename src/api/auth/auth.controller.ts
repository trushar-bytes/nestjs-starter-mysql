import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpRequestDto } from './dto/signup-request.dto';
import { ApiTags } from '@nestjs/swagger';
import { SignInRequestDto } from './dto/signin-request.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('sign-in')
  signIn(@Body() body: SignInRequestDto) {
    return this.authService.signIn(body);
  }

  @Post('sign-up')
  signUp(@Body() createAuthDto: SignUpRequestDto) {
    return this.authService.signUp(createAuthDto);
  }
}
