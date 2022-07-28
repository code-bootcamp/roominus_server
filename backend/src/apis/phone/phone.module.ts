import { Module } from '@nestjs/common';

import { PhoneResolver } from './phone.resolver';
import { PhoneService } from './phone.service';

@Module({
    providers: [PhoneResolver, PhoneService],
})
export class PhoneModule {}
