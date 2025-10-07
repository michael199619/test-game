import { registerAs } from '@nestjs/config';
import { get } from 'env-var';

export const appConfig = registerAs('app', () => ({
    port: get('PORT').default('2000').asPortNumber(),
    nodeEnv: get('NODE_ENV').default('development').asString(),
}));

export const kafkaConfig = registerAs('kafka', () => ({
    brokers: get('KAFKA_BROKERS').default('localhost:9092').asString().split(',')
}));
