import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';

import { CafeModule } from './apis/cafe/cafe.module';

import { AppController } from './app.controller';
import { AppResolver } from './app.resolver';

@Module({
    imports: [
        CafeModule,
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
