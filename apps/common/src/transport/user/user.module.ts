import { DynamicModule, Global, Module } from '@nestjs/common';
import { ClientKafka, ClientsModule, Transport } from '@nestjs/microservices';
import { TRANSPORT_USER_KAFKA, TRASPORT_USER_GROUP } from './constants';
import { IUserTransportOptions } from './user.interface';
import { UsersPublisher } from './users.publisher';

@Global()
@Module({})
export class UsersTransportModule {
  static register(
    { useFactory, inject }: { useFactory: (...injects: any) => IUserTransportOptions, inject: any[] }
  ): DynamicModule {
    return {
      module: UsersTransportModule,

      imports: [
        ClientsModule.registerAsync([
          {
            name: TRANSPORT_USER_KAFKA,
            useFactory: async (...injects) => {
              const { clientId, kafkaBrokers } = await useFactory(...injects);

              return {
                transport: Transport.KAFKA,
                options: {
                  client: {
                    clientId,
                    brokers: kafkaBrokers
                  },
                  consumer: {
                    groupId: TRASPORT_USER_GROUP
                  }
                }
              }
            },
            inject
          },
        ]),
      ],
      exports: [ClientsModule],
    }
  }
}

@Module({})
export class UsersPublisherModule {
  static register(): DynamicModule {

    return {
      module: UsersPublisherModule,

      providers: [
        {
          provide: UsersPublisher,
          useFactory: async (kafkaService: ClientKafka) => {
            return new UsersPublisher(kafkaService)
          },
          inject: [TRANSPORT_USER_KAFKA]
        },
      ],
      exports: [UsersPublisher],
    };
  }
}