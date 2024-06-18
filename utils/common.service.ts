import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ErrorHandlerService } from './error-handler.service';

interface PasswordHash {
  passwordHash: string;
  salt: string;
}

@Injectable()
export class CommonService {

  constructor(
    private jwtService: JwtService,
    private readonly errorHandlerService: ErrorHandlerService,
  ) { }

  async generatePasswordHash(plainPassword: string): Promise<PasswordHash> {
    try {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(plainPassword, salt);
      return {
        passwordHash,
        salt,
      };
    } catch (error) {
      return error;
    }
  }

  async comparePassword(plainPassword: string, passwordHash: string): Promise<boolean> {
    try {
      return await bcrypt.compare(plainPassword, passwordHash);
    } catch (error) {
      return error;
    }
  }

  async generateJWTToken(id: number, email: string, role: string): Promise<string> {
    try {
      const payload = { id, email, role };
      return this.jwtService.sign(payload, {
        expiresIn: '1d',
      });
    } catch (error) {
      this.errorHandlerService.InternalServerError(error);
    }
  }


}