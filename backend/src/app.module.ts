import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';

import { UserModule } from './apis/user/user.module';
import { CafeModule } from './apis/cafe/cafe.module';
import { ThemeModule } from './apis/theme/theme.module';
import { ThemeReviewModule } from './apis/themeReview/themeReview.module';
import { GenreModule } from './apis/genre/genre.module';
import { BoardModule } from './apis/board/board.module';
import { ThemeMenuModule } from './apis/themeMenu/themeMenu.module';
import { ReservationModule } from './apis/reservations/reservation.module';
import { IamportModule } from './apis/iamport/iamport.module';
import { AuthModule } from './apis/auth/auth.module';
import { BoardreviewModule } from './apis/boardsreview/boardreview.module';
import { BoardsecondreviewModule } from './apis/boardsecondreview/boardsecondreview.module';

import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { PhoneModule } from './apis/phone/phone.module';

@Module({
    imports: [
        // PhoneModule,
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
                origin: 'http://localhost:3000',
                credential: 'include',
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
            logging: true,
        }),
        CacheModule.register<RedisClientOptions>({
            store: redisStore,
            url: 'redis://172.19.209.3:6379', // 배포
            // url: 'redis://localhost:6379',
            isGlobal: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppResolver],
})
export class AppModule {}
