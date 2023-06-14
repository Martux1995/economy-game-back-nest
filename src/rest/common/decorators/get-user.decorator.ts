import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { AppRequest } from '../types';

export const GetUser = createParamDecorator(
  (param: string, ctx: ExecutionContext) => {
    const user = ctx.switchToHttp().getRequest<AppRequest>().user;

    if (!user) {
      throw new InternalServerErrorException(
        'User not found (Decorator error)',
      );
    }

    return user;
  },
);
