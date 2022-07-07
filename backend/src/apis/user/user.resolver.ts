import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import { Theme } from '../theme/entities/theme.entity';

@Resolver()
export class UserResolver {
    constructor(
        private readonly userService: UserService, //
    ) {}

    @Mutation(() => User)
    async createUser(
        @Args('email') email: string, //
        @Args('password') password: string,
        @Args('name') name: string,
        @Args('phone') phone: string,
    ) {
        const hashedPassword = await bcrypt.hash(password, 10.2);
        console.log(hashedPassword);
        return this.userService.create({ email, hashedPassword, name, phone });
    }

    @Query(() => User)
    fetchUser(@Args('email') email: string) {
        return this.userService.findOne({ email });
    }

    @Mutation(() => Boolean)
    deleteUser(
        @Args('email') email: string, //
    ) {
        return this.userService.delete({ email });
    }
}
