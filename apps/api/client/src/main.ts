import { ExFilter } from '@game/common';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { SERVICE_ID } from './constants';
import { appConfig } from './modules/config/config';

async function bootstrap() {
  const logger = new Logger()
  const app = await NestFactory.create(AppModule, { logger });

  const config = app.get<ConfigType<typeof appConfig>>(appConfig.KEY);

  app.useGlobalFilters(new ExFilter());

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: false,
  }));

  const swaggerConfig = new DocumentBuilder()
    .setTitle(SERVICE_ID)
    .setDescription('Api for client')
    .setVersion('1.0')
    .build();
  const documentFactory = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(config.port, () => {
    logger.log(`API Client is running on port http://localhost:${config.port}/api`);
  });
}
bootstrap();
