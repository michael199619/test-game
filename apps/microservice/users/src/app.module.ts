import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './db/prisma.module';
import { ConfigurationModule } from './modules/config/config.module';
import { TransportModule } from './modules/transport/transport.module';
import { AddBalanceForUserModule } from './usecases/add-balance-for-user/add-balance-for-user.module';
import { GetAllUsersModule } from './usecases/get-all-users/get-all-users.module';
import { GetUserModule } from './usecases/get-user/get-user.module';

@Module({
  imports: [
    ConfigurationModule,
    PrismaModule,
    TransportModule,

    GetUserModule,
    GetAllUsersModule,
    AddBalanceForUserModule
  ],
  controllers: [AppController],
})
export class AppModule { }
