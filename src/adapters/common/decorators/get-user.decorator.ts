import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserSessionData } from '../../../domain/types';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();

    const user = req.user;

    if (!user) {
      throw new InternalServerErrorException('User not found (req)');
    }

    return !data ? (user as UserSessionData) : user[data];
  },
);
