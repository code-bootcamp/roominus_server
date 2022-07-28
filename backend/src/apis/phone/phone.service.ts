import { CACHE_MANAGER, ConflictException, Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Cache } from 'cache-manager';
import coolsms from 'coolsms-node-sdk';
import 'dotenv/config';

@Injectable()
export class PhoneService {
    constructor(
        @Inject(CACHE_MANAGER)
        private readonly cacheManager: Cache,
    ) {}

    checklength({ phone }) {
        if (phone.length !== 11) return false; //
        return true;
    }

    generateToken() {
        const mycount = 6;
        if (mycount === undefined) {
            console.log('에러 발생!!! 갯수를 제대로 입력해 주세요!!!');
            return;
        } else if (mycount <= 0) {
            console.log('에러 발생!!! 갯수가 너무 적습니다!!!');
            return;
        } else if (mycount > 10) {
            console.log('에러 발생!!! 갯수가 너무 많습니다!!!');
            return;
        }
        return String(Math.floor(Math.random() * 10 ** mycount)).padStart(mycount, '0');
    }

    async sendToken({ phone }) {
        // 인증번호 생성
        const token = this.generateToken();
        const content = `[roominus] 인증번호 ${token}을 입력해주세요.`;

        // 발송전에 휴대폰 형식 확인
        if (!this.checklength) return '휴대폰 번호를 다시 확인해주세요.';

        const SMS_ID = process.env.COOLSMS_CLIENT_API_ID;
        const SMS_SECRET = process.env.COOLSMS_CLIENT_API_SECRET;
        const SMS_SENDER = process.env.COOLSMS_CLIENT_SENDER;

        // 인증번호 캐시 데이터에 저장: 저장 시간 임의로 3분 설정
        await this.cacheManager.set(phone, token, {
            ttl: 180,
        });

        //인증문자 발송
        try {
            const messageService = new coolsms(SMS_ID, SMS_SECRET);
            messageService.sendOne({
                to: phone,
                from: SMS_SENDER,
                text: content,
                type: 'SMS',
                autoTypeDetect: false,
            });
            return `${phone}으로 인증번호 ${token}를 발송하였습니다.`;
        } catch (error) {
            throw new UnprocessableEntityException(error);
        }
    }

    async checkToken({ phone, tokenInput }) {
        const tokenSent = await this.cacheManager.get(phone);

        if (tokenSent === tokenInput) return tokenSent;
        else {
            return new ConflictException('인증번호가 틀렸습니다.');
        }
    }
}
