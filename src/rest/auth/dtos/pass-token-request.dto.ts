import { IsEmail } from 'class-validator';

export class PassTokenRequestDto {
  @IsEmail()
  email: string;
}
