import { IsEmail, IsOptional, IsString } from 'class-validator';
import { IsChileanRUN } from '../../../common/validators/is-chilean-run';

export class LoginDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsChileanRUN()
  personalNumberId: string;

  @IsString()
  password: string;
}
