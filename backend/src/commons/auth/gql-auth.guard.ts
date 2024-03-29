import { GqlExecutionContext } from '@nestjs/graphql';
import { ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export class GqlAuthAccessGuard extends AuthGuard('access') {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        return req;
    }
}

export class GqlAuthRefreshGuard extends AuthGuard('refresh') {
    getRequest(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        return ctx.getContext().req;
    }
}
