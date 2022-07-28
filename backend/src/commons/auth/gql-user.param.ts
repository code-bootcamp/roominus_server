import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface ICurrentUser {
    email?: string;
    id?: string;
    isserviceprovider?: boolean;
    phone?: string;
    name?: string;
}

export const CurrentUser = createParamDecorator((data, context: ExecutionContext): ICurrentUser => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
});
