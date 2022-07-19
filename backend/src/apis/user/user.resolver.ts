import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';

import { UserService } from './user.service';
import { CreateUserInput } from './dto/createUser.input';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

import { User } from './entities/user.entity';
import { Theme } from '../theme/entities/theme.entity';

@Resolver()
export class UserResolver {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService, //
        private readonly authService: AuthService,
    ) {}

    @Mutation(() => User)
    async createUser(
        @Args('createUserInput') createUserInput: CreateUserInput, //
    ) {
        const hashedPassword = await bcrypt.hash(createUserInput.password, 10.2);
        return await this.userService.create({ createUserInput, hashedPassword });
    }

    @Query(() => User)
    fetchUser(@Args('email') email: string) {
        return this.userService.findOne({ email });
    }

    // @UseGuards(GqlAuthAccessGuard)
    @Query(() => User)
    fetchFindPassword(
        @Args('email') email: string, //
        @Args('phone') phone: string,
    ) {
        return this.userService.findPassword({ email, phone });
    }

    @Mutation(() => Boolean)
    deleteUser(
        @Args('email') email: string, //
    ) {
        return this.userService.delete({ email });
    }

    @UseGuards(GqlAuthAccessGuard)
    @Query(() => String)
    testAuthGuard(@CurrentUser() currentUser: ICurrentUser) {
        return '인증 성공!!';
    }
}
