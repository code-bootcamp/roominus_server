import { Module } from '@nestjs/common';

import { IamportService } from './iamport.service';

@Module({
    imports: [],
    providers: [IamportService],
    exports: [IamportService],
})
export class IamportModule {}
