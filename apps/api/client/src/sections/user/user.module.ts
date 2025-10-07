import { UsersPublisherModule } from '@game/common';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';

@Module({
    imports: [
        UsersPublisherModule.register()
    ],
    controllers: [UserController]
})
export class UserModule { }
