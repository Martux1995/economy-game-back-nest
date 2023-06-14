import {
  BadRequestException,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { ERoles } from '../../../domain/enums';

import { AppRequest } from '../types';
import { META_ROLES_VAR } from '../decorators';

@Injectable()
export class IsUserGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const validRoles: ERoles[] = this.reflector.get(
      META_ROLES_VAR,
      context.getHandler(),
    );

    return this._checkRoles(validRoles, context);
  }

  private _checkRoles(
    validRoles: ERoles[],
    context: ExecutionContext,
  ): boolean {
    if (!validRoles || validRoles.length === 0) {
      return true;
    }

    const user = context.switchToHttp().getRequest<AppRequest>().user;

    if (!user) {
      throw new BadRequestException('User Not Found');
    }

    return validRoles.includes(ERoles.Admin) && user.role == 'ADMIN';
  }
}
