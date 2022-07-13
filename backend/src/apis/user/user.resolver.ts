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
        @Args('userid') userid: string, //
        @Args('password') password: string,
        @Args('name') name: string,
        @Args('phone') phone: string,
        @Args('email') email: string,
    ) {
        const hashedPassword = await bcrypt.hash(password, 10.2);
        console.log(hashedPassword);
        return this.userService.create({ userid, hashedPassword, name, phone, email });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Query(() => User)
    fetchUser(@Args('userid') userid: string) {
        return this.userService.findOne({ userid });
    }

    // @UseGuards(GqlAuthAccessGuard)
    // @Query(() => String)
    // fetchUser() {
    //     return '인증 통과!!';
    // }

    @Mutation(() => Boolean)
    deleteUser(
        @Args('userid') userid: string, //
    ) {
        return this.userService.delete({ userid });
    }
}
