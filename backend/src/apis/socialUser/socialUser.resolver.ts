import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { SocialUserService } from './socialUser.service';

import { SocialUser } from './entities/socialUser.entity';

@Resolver()
export class SocialUserResolver {
    constructor(
        private readonly socialuserService: SocialUserService, //
    ) {}
    @Query(() => SocialUser)
    async fetchSocialUser(
        @Args('phone') phone: string, //
    ) {
        return await this.socialuserService.findsocialUserPhone({ phone });
    }

    @Mutation(() => SocialUser)
    async createSocialUser(
        @Args('email') email: string, //
        @Args('phone') phone: string, //
        @Args('name') name: string, //
    ) {
        return await this.socialuserService.create({ email, phone, name });
    }
}
