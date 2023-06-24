import { IsString, IsStrongPassword } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  key: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
  })
  newPassword: string;
}
