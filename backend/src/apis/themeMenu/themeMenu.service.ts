import { Injectable, UnprocessableEntityException } from '@nestjs/common';
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

    async findOne() {
        return await this.themeMenuRepository.find();
    }

    async create({ createThemeMenuInput }) {
        const { cafeName, themeTitle, ...themeMenu } = createThemeMenuInput;

        const hasCafe = await this.cafeRepositotry.findOne({ name: cafeName });

        const hasTheme = await this.themeRepositotry.findOne({
            where: {
                title: themeTitle, //
                cafe: hasCafe.id,
            },
        });

        if (!hasCafe && hasTheme) throw new UnprocessableEntityException('같은 이름으로 등록된 테마가 있습니다!!');

        return await this.themeMenuRepository.save({
            ...themeMenu, //
            cafe: hasCafe.id,
            theme: hasTheme.id,
        });
    }
}
