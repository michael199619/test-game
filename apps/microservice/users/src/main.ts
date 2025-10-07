import { TRASPORT_USER_GROUP } from '@game/common';
import { ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { SERVICE_ID } from './constants';
import { kafkaConfig } from './modules/config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configKafka = app.get<ConfigType<typeof kafkaConfig>>(kafkaConfig.KEY);

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

  console.log(`Users microservice is running`);
}
bootstrap();
