import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SocialUserService } from './socialUser.service';

@Resolver()
export class SocialUserResolver {
    constructor(
        private readonly socialuserService: SocialUserService, //
    ) {}
    @Query(() => String)
    async fetchSocialuser(
        @Args('email') email: string, //
    ) {
        return await this.socialuserService.findOne({ email });
    }

    @Mutation(() => String)
    async createSocialUser(
        @Args('email') email: string, //
    ) {
        return await this.socialuserService.create({ email });
    }
}
