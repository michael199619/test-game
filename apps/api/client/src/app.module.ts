import { Module } from '@nestjs/common';
import { TransportModule } from './modules/transport/transport.module';
import { UserModule } from './sections/user/user.module';

@Module({
  imports: [
    TransportModule,
    UserModule
  ],
})
export class AppModule { }
