import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';

import { UserModule } from './apis/user/user.module';
import { CafeModule } from './apis/cafe/cafe.module';
import { ThemeModule } from './apis/theme/theme.module';
import { ThemeReviewModule } from './apis/themeReview/themeReview.module';

import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';
import { GenreModule } from './apis/genre/genre.module';
import { BoardModule } from './apis/board/board.module';

@Module({
    imports: [
        BoardModule,
        GenreModule,
        CafeModule,
        ThemeModule,
        UserModule,
        ThemeReviewModule,
        ////////GraphQL
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: 'src/commons/graphql/schema.gql',
            context: ({ req, res }) => ({ req, res }),
        }),
        ///////MySQL
        TypeOrmModule.forRoot({
            type: 'mysql',
            // host: process.env.MYSQL_HOST,
            host: 'localhost',
            port: 3306,
            username: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASS,
            database: process.env.MYSQL_DATABASE,
            entities: [__dirname + '/apis/**/*.entity.*'],
            synchronize: true,
            logging: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppResolver],
})
export class AppModule {}
