import { ConflictException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { PhoneService } from './phone.service';

@Resolver()
export class PhoneResolver {
    constructor(
        private readonly phoneService: PhoneService, //
    ) {}

    @Mutation(() => String)
    async sendTotkentoPhone(
        @Args('phone') phone: string, //
    ) {
        const check = await this.phoneService.checklength({ phone });
        console.log('check');
        if (check) return await this.phoneService.sendToken({ phone });
        return await new ConflictException('오류');
    }

    @Mutation(() => String)
    async checkinputToken(
        @Args('phone') phone: string, //
        @Args('tokenInput') tokenInput: string,
    ) {
        const tokenresult = await this.phoneService.checkToken({ phone, tokenInput });
        if (tokenresult) return true;
        return false;
    }
}
