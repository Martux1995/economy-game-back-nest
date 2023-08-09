import { AuthGuard } from '@nestjs/passport';
import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';

import { EUserRoles } from '../../../domain/enums';
import { IsUserGuard } from '../guards/is-user.guard';

export const META_ROLES_VAR = 'rol';

export const Auth = (...roles: EUserRoles[]) => {
  return applyDecorators(
    SetMetadata(META_ROLES_VAR, roles),
    UseGuards(AuthGuard('jwt'), IsUserGuard),
  );
};
