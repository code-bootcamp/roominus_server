import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class IamportService {
    getToken() {
        const token = axios({
            url: 'https://api.iamport.kr/users/getToken',
            method: 'post', // POST method
            headers: { 'Content-Type': 'application/json' },
            data: {
                imp_key: process.env.IMP_API_KEY,
                imp_secret: process.env.IMP_API_SECRET,
            },
        });
        return token;
    }
    async getPaymentData({ impUid, impAccessToken }) {
        try {
            const paymentData = await axios({
                url: `https://api.iamport.kr/payments/${impUid}`,
                method: 'get',
                headers: { Authorization: impAccessToken.access_token },
            });
            return paymentData;
        } catch (error) {
            throw new UnprocessableEntityException(error, '결제 정보 조회 실패!!');
        }
    }
    async paymentCancel({
        impAccessToken, //
        impUid,
        reason,
        cancelAmount,
        cancelableAmount,
    }) {
        try {
            const getCancelData = await axios({
                url: 'https://api.iamport.kr/payments/cancel',
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: impAccessToken, // 아임포트 서버로부터 발급받은 엑세스 토큰
                },
                data: {
                    reason, // 클라이언트로부터 받은 환불사유
                    imp_uid: impUid, // imp_uid를 환불 `unique key`로 입력
                    amount: cancelAmount, // 클라이언트로부터 받은 환불금액
                    checksum: cancelableAmount, // [권장] 환불 가능 금액 입력
                },
            });
            const { response } = getCancelData.data;
            return response;
        } catch (error) {
            throw new UnprocessableEntityException(error, '환불 실패!');
        }
    }
}
