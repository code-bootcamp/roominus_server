import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';

import { UserService } from './user.service';
import { CreateUserInput } from './dto/createUser.input';

import { User } from './entities/user.entity';
import { Theme } from '../theme/entities/theme.entity';

@Resolver()
export class UserResolver {
    constructor(
        private readonly userService: UserService, //
    ) {}

    @Mutation(() => User)
    async createUser(
        @Args('password') password: string, //
        @Args('createUserInput') createUserInput: CreateUserInput,
    ) {
        const hashedPassword = await bcrypt.hash(password, 10.2);

        return await this.userService.create({ createUserInput, hashedPassword });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Query(() => User)
    fetchUser(@Args('email') email: string) {
        return this.userService.findOne({ email });
    }

    @Query(() => [User])
    fetchUserLoggedIn() {
        return this.userService.findAll();
    }

    // @UseGuards(GqlAuthAccessGuard)
    // @Query(() => String)
    // fetchUser() {
    //     return '인증 통과!!';
    // }

    @Mutation(() => Boolean)
    deleteUser(
        @Args('email') email: string, //
    ) {
        return this.userService.delete({ email });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Query(() => String)
    testAuthGuard(@CurrentUser() currentUser: ICurrentUser) {
        console.log(currentUser);
        return '인증 성공!!';
    }
}
