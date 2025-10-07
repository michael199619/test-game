import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UsersRepository } from './users/users.repository';

@Module({
  providers: [
    PrismaService,
    UsersRepository
  ],
  exports: [
    PrismaService,
    UsersRepository
  ],
})
export class PrismaModule { }
