import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TransportModule } from './modules/transport/transport.module';
import { UserModule } from './sections/user/user.module';

@Module({
  imports: [
    TransportModule,
    UserModule
  ],
  providers: [{
    provide: APP_PIPE,
    useClass: ValidationPipe,
  }]
})
export class AppModule { }
