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
import { UpdateUserInput } from './dto/updateUser.input';

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
    fetchUser(@Args('phone') phone: string) {
        return this.userService.findEmail({ phone });
    }

    // @UseGuards(GqlAuthAccessGuard)
    @Query(() => User)
    fetchFindPassword(
        @Args('email') email: string, //
        @Args('phone') phone: string,
    ) {
        return this.userService.findPassword({ email, phone });
    }

    @Mutation(() => User)
    async updateUser(
        // @Args('userId') userId: string, //
        @Args('updateUserInput') updateUserInput: UpdateUserInput,
    ) {
        const hashedPassword = await bcrypt.hash(updateUserInput.password, 10.2);

        return await this.userService.update({ hashedPassword, updateUserInput });
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

    @Mutation(() => Boolean)
    updateUserStatus(
        @Args('email') email: string, //
    ) {
        return this.userService.updateStatus({ email });
    }
}
