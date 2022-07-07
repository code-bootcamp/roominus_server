import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface ICurrentUser {
    id?: string;
    email: string;
    name?: string;
    password?: string;
    age?: number;
}
export const CurrentUser = createParamDecorator((data, context: ExecutionContext): ICurrentUser => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
});
