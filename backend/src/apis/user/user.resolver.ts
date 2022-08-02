import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { AuthService } from '../auth/auth.service';

import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { UserService } from './user.service';

import { User } from './entities/user.entity';

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

    @Mutation(() => User)
    async createSocialUser(
        @Args('email') email: string, //
        @Args('phone') phone: string, //
        @Args('name') name: string, //
    ) {
        return await this.userService.createSocialUser({ email, phone, name });
    }

    @Query(() => [User])
    async fetchUserAll(@Args('page', { defaultValue: 1 }) page: number) {
        return await this.userService.findAll({ page });
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
        @Args('userId') userId: string, //
        @Args('updateUserInput') updateUserInput: UpdateUserInput,
    ) {
        const hashedPassword = await bcrypt.hash(updateUserInput.password, 10.2);

        return await this.userService.update({ userId, hashedPassword, updateUserInput });
    }

    @Mutation(() => User)
    async updateSocialUser(
        @Args('userId') userId: string, //
        @Args('updateUserInput') updateUserInput: UpdateUserInput,
    ) {
        return await this.userService.updateSocialUser({ userId, updateUserInput });
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
