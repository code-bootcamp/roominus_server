import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface ICurrentUser {
    email?: string;
    id?: string;
    isServiceProvider?: boolean;
}
export const CurrentUser = createParamDecorator((data, context: ExecutionContext): ICurrentUser => {
    const ctx = GqlExecutionContext.create(context);
    console.log(ctx.getContext().req.user);
    return ctx.getContext().req.user;
});
