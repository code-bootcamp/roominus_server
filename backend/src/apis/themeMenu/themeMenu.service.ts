import { ConflictException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Cafe } from '../cafe/entities/cafe.entity';
import { Theme } from '../theme/entities/theme.entity';
import { ThemeMenu } from './entities/themeMenu.entity';

@Injectable()
export class ThemeMenuService {
    constructor(
        @InjectRepository(ThemeMenu)
        private readonly themeMenuRepository: Repository<ThemeMenu>,
        @InjectRepository(Cafe)
        private readonly cafeRepositotry: Repository<Cafe>,
        @InjectRepository(Theme)
        private readonly themeRepositotry: Repository<Theme>,
    ) {}

    async findAll({ themeId }) {
        return await this.themeMenuRepository.find({
            where: { theme: themeId },
            relations: ['cafe', 'theme'],
            order: { reservation_time: 'ASC' },
        });
    }

    async create({ createThemeMenuInput }) {
        const { cafeName, themeTitle, ...themeMenu } = createThemeMenuInput;

        const hasCafe = await this.cafeRepositotry.findOne({ name: cafeName });

        if (!hasCafe) throw new UnprocessableEntityException('카페가 존재하지 않습니다!!');

        const hasTheme = await this.themeRepositotry.findOne({
            where: {
                title: themeTitle, //
                cafe: hasCafe.id,
            },
        });

        if (!hasTheme) throw new UnprocessableEntityException('카페에 테마가 존재하지 않습니다!!');

        const hasThemeMenu = await this.themeMenuRepository.findOne({
            where: {
                reservation_time: createThemeMenuInput.reservation_time,
                people_number: createThemeMenuInput.people_number,
            },
        });

        if (hasThemeMenu) throw new ConflictException('같은 시간 같은 인원 수로 등록된 예약 공간이 있습니다!!');

        const newThemeMenu = await this.themeMenuRepository.save({
            ...themeMenu, //
            cafe: hasCafe.id,
            theme: hasTheme.id,
        });

        return await this.themeMenuRepository.findOne({
            where: { id: newThemeMenu.id },
            relations: ['cafe', 'theme'],
        });
    }

    async delete({ themeMenuId }) {
        const hasThemeMenu = await this.themeMenuRepository.findOne({ id: themeMenuId });
        if (!hasThemeMenu) throw new UnprocessableEntityException('존재하지 않는 시간입니다!!');

        const result = await this.themeMenuRepository.softDelete({ id: themeMenuId });

        if (result.affected) {
            return true;
        } else {
            throw new ConflictException('삭제를 실패했습니다!!');
        }
    }
}
