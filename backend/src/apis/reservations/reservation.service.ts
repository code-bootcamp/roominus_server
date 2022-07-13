import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';

import { Cafe } from '../cafe/entities/cafe.entity';
import { ThemeMenu } from '../themeMenu/entities/themeMenu.entity';
import { User } from '../user/entities/user.entity';
import { Reservation } from './entities/reservation.entity';

@Injectable()
export class ReservationService {
    constructor(
        @InjectRepository(Reservation)
        private readonly reservationRepository: Repository<Reservation>,
        @InjectRepository(Cafe)
        private readonly cafeRepository: Repository<Cafe>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(ThemeMenu)
        private readonly themeMenuRepository: Repository<ThemeMenu>,
        private readonly connection: Connection,
    ) {}

    async findAll({ cafeId, reservationDate }) {
        const result = this.reservationRepository.find({
            where: { cafe: cafeId, reservation_date: reservationDate },
            relations: ['cafe', 'user', 'theme_menu'],
        });

        if (!result || (await result).length === 0) throw new UnprocessableEntityException('예약이 없습니다!!');

        return result;
    }

    async findwithUser({ userId }) {
        const result = this.reservationRepository.find({
            where: { user: userId },
            relations: ['cafe', 'user', 'theme_menu'],
            order: { createdAt: 'DESC' },
        });

        if (!result || (await result).length === 0) throw new UnprocessableEntityException('예약이 없습니다!!');

        return result;
    }

    async create({ cafeId, userId, themeMenuId, createReservationInput }) {
        const { people_number, ...reservation } = createReservationInput;

        const queryRunner = await this.connection.createQueryRunner();
        await queryRunner.connect();

        /////
        // 최대 인원 초과 확인 필요?
        ////

        await queryRunner.startTransaction('SERIALIZABLE');

        try {
            const hasCafe = await this.cafeRepository.findOne({ id: cafeId });

            const hasUser = await this.userRepository.findOne({ id: userId });

            const hasThemeMenu = await this.themeMenuRepository.findOne({ id: themeMenuId });

            if (!hasCafe || !hasUser || !hasThemeMenu) throw new UnprocessableEntityException('예약 실패!!');

            const newReservationInput = this.reservationRepository.create({
                ...reservation,
                cafe: hasCafe.id,
                user: hasUser.id,
                theme_menu: hasThemeMenu.id,
            });

            const newReservation = await queryRunner.manager.save(newReservationInput);

            const result = await queryRunner.manager.findOne(Reservation, {
                where: { id: newReservation['id'] },
                relations: ['cafe', 'user', 'theme_menu'],
            });

            await queryRunner.commitTransaction();

            return result;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new ConflictException(error, '예약 실패!!');
        } finally {
            await queryRunner.release();
        }
    }

    update() {}

    delete() {}
}
