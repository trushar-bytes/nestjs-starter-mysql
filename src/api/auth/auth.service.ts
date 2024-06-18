import { Injectable } from '@nestjs/common';
import { SignUpRequestDto } from './dto/signup-request.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { CommonService } from 'utils/common.service';
import { ErrorHandlerService } from 'utils/error-handler.service';
import { CODE } from 'utils/constants/response-code.enum';
import { BaseResponseDto } from 'utils/formatter/response.dto';
import { SignInRequestDto } from './dto/signin-request.dto';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(User)
    private readonly userTable: Repository<User>,
    private readonly commonService: CommonService,
    private readonly errorHandlerService: ErrorHandlerService
  ) {

  }

  async signUp(data: SignUpRequestDto): Promise<BaseResponseDto> {
    try {
      const userExists = await this.userTable.findOne({ where: { email: data.email } });
      if (userExists) {
        await this.errorHandlerService.BadRequest('User already exists with this email');
      }

      const { salt, passwordHash } = await this.commonService.generatePasswordHash(data.password);
      const user = new User();
      user.email = data.email;
      user.password = passwordHash;
      user.name = data.name;
      user.role = 'admin';
      await this.userTable.save(user);
      return {
        statusCode: CODE.SUCCESS,
        message: 'User created',
        data: user
      };
    } catch (error) {
      await this.errorHandlerService.InternalServerError(error);
    }
  }

  async signIn(data: SignInRequestDto): Promise<BaseResponseDto> {
    try {
      const user = await this.userTable.findOne({ where: { email: data.email } });
      if (!user) {
        await this.errorHandlerService.BadRequest('User not found');
      }
      const isPasswordMatched = await this.commonService.comparePassword(data.password, user.password);
      if (!isPasswordMatched) {
        await this.errorHandlerService.BadRequest('Password is incorrect');
      }

      // generate token using email and id as payload
      const token = await this.commonService.generateJWTToken(user.id, user.email, user.role);
      return {
        statusCode: CODE.SUCCESS,
        message: 'User logged in',
        data: {
          user,
          token
        }
      };
    } catch (error) {
      await this.errorHandlerService.InternalServerError(error);
    }
  }

}
