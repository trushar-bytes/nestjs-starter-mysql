import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class SignUpRequestDto {
  @ApiProperty({ example: 'test', required: true })
  @IsString()
  name: string;

  @ApiProperty({ example: 'test@gmail.com', required: true })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'bytes@123', required: true })
  @IsString()
  @MaxLength(20)
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'test', required: true })
  role: string;
}
