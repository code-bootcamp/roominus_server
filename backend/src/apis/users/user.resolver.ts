import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

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
    ) {
        const hashedPassword = await bcrypt.hash(password, 10.2);
    }
}
