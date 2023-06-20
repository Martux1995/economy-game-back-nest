import { AuthGuard } from '@nestjs/passport';
import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';

import { ERoles } from '../../../domain/enums';
import { IsUserGuard } from '../guards/is-user.guard';

export const META_ROLES_VAR = 'rol';

export const Auth = (...roles: ERoles[]) => {
  return applyDecorators(
    SetMetadata(META_ROLES_VAR, roles),
    UseGuards(AuthGuard(), IsUserGuard),
  );
};
