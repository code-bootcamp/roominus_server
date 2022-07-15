import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { GqlAuthAccessGuard } from 'src/commons/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/commons/auth/gql-user.param';
import { Theme } from '../theme/entities/theme.entity';
import { CreateUserInput } from './dto/createUser.input';
import { AuthService } from '../auth/auth.service';
import { JwtService } from '@nestjs/jwt';

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

    @UseGuards(GqlAuthAccessGuard)
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
