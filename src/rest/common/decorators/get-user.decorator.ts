import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { AppRequest } from '../types';

export const GetUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest<AppRequest>();

    const user = req.user;

    if (!user) {
      throw new InternalServerErrorException('User not found (req)');
    }

    return !data ? user : user[data];
  },
);
