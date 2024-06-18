import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";


export class BaseResponseDto {

  @Expose()
  @ApiProperty({ example: 200 })
  statusCode: number;

  @Expose()
  @ApiProperty({ example: 'Success' })
  message: string;

  @Expose()
  data: any;

  @Expose()
  errors?: any;
}
