import { UsersTransportModule } from '@game/common';
import { Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { SERVICE_ID } from '../../constants';
import { kafkaConfig } from '../config/config';
import { ConfigurationModule } from '../config/config.module';

@Module({
    imports: [
        ConfigurationModule,
        UsersTransportModule.register({
            useFactory: (configKafa: ConfigType<typeof kafkaConfig>) => ({
                kafkaBrokers: configKafa.brokers,
                clientId: SERVICE_ID
            }),
            inject: [kafkaConfig.KEY]
        }),
    ],
})
export class TransportModule { }
