import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: [
            'http://localhost:3000', //
            'https://roominus.site',
        ],
        optionsSuccessStatus: 204,
        credentials: true,
        exposedHeaders: ['Authorization', 'Set-Cookie', 'Cookie'],
    });
    await app.listen(3000);
}
bootstrap();
