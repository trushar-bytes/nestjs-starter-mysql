import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ErrorHandlerService {
  async InternalServerError(error: any) {
    throw new HttpException(
      error.message,
      error.status ? error.status : HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  async BadRequest(message: string) {
    throw new HttpException(
      message,
      HttpStatus.BAD_REQUEST,
    );
  }
}
