import { IsString, IsStrongPassword, IsUUID } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsUUID('4')
  key: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minNumbers: 1,
  })
  newPassword: string;
}
