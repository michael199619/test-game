import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig, kafkaConfig } from './config';

@Module({
    imports: [
        ConfigModule.forRoot({
            cache: true,
            isGlobal: true,
            load: [appConfig, kafkaConfig],
        }),
    ],
})
export class ConfigurationModule { }
