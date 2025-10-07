import { ExFilter, TRASPORT_USER_GROUP } from '@game/common';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { SERVICE_ID } from './constants';
import { kafkaConfig } from './modules/config/config';

async function bootstrap() {
  const logger = new Logger();

  const app = await NestFactory.create(AppModule, { logger });

  const configKafka = app.get<ConfigType<typeof kafkaConfig>>(kafkaConfig.KEY);

  app.useGlobalFilters(new ExFilter());

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: false,
  }));

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: SERVICE_ID,
        brokers: configKafka.brokers,
      },
      consumer: {
        groupId: TRASPORT_USER_GROUP,
      },
    },
  });

  await app.startAllMicroservices();
  app.init()

  logger.log(`Users microservice is running`);
}
bootstrap();
