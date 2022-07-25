import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisClientOptions } from 'redis';
import 'dotenv/config';

import { BoardsecondreviewModule } from './apis/boardsecondreview/boardsecondreview.module';
import { ReservationModule } from './apis/reservations/reservation.module';
import { BoardreviewModule } from './apis/boardsreview/boardreview.module';
import { ThemeReviewModule } from './apis/themeReview/themeReview.module';
import { SocialUserModule } from './apis/socialUser/socialUser.module';
import { ThemeMenuModule } from './apis/themeMenu/themeMenu.module';
import { IamportModule } from './apis/iamport/iamport.module';
import { ThemeModule } from './apis/theme/theme.module';
import { GenreModule } from './apis/genre/genre.module';
import { BoardModule } from './apis/board/board.module';
import { PhoneModule } from './apis/phone/phone.module';
import { UserModule } from './apis/user/user.module';
import { CafeModule } from './apis/cafe/cafe.module';
import { AuthModule } from './apis/auth/auth.module';

import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';

@Module({
    imports: [
        SocialUserModule,
        PhoneModule,
        BoardsecondreviewModule,
        BoardreviewModule,
        AuthModule,
        BoardModule,
        GenreModule,
        CafeModule,
        ThemeModule,
        UserModule,
        ThemeReviewModule,
        ThemeMenuModule,
        ReservationModule,
        IamportModule,
        ////////GraphQL
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/commons/graphql/schema.gql',
            context: ({ req, res }) => ({ req, res }),
            cors: {
                origin: [
                    'http://localhost:3000', //
                    'https://roominus.site',
                ],
                credential: true,
                exposedHeaders: ['Authorization', 'Set-Cookie', 'Cookie'],
            },
        }),
        ///////MySQL
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.MYSQL_HOST, // 배포
            // host: 'localhost', // local
            port: 3306,
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASS,
            database: process.env.MYSQL_DATABASE,
            entities: [__dirname + '/apis/**/*.entity.*'],
            synchronize: true,
            logging: ['error'],
        }),
        CacheModule.register<RedisClientOptions>({
            store: redisStore,
            url: 'redis://172.19.209.3:6379',
            // url: 'redis://localhost:6379',
            isGlobal: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppResolver],
})
export class AppModule {}
