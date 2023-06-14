import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { ERoles } from '../../../domain/enums';
import { IsUserGuard } from '../guards/is-user.guard';

export const META_ROLES_VAR = 'rol';

export const Auth = (...roles: ERoles[]) => {
  return applyDecorators(_RoleProtected(...roles), UseGuards(IsUserGuard));
};

const _RoleProtected = (...args: ERoles[]) => SetMetadata(META_ROLES_VAR, args);
