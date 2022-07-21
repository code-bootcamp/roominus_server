import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SocialUser } from './entities/socialUser.entity';
import { SocialUserService } from './socialUser.service';

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
    ) {
        return await this.socialuserService.create({ email });
    }
}
