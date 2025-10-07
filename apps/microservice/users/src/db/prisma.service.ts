import { prismaServiceFabric } from '@game/common';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'prisma_types/users';
export * from 'prisma_types/users';

@Injectable()
export class PrismaService extends prismaServiceFabric(
  PrismaClient,
  'UsersPrismaService',
) {
  constructor() {
    super();
  }


  async seed() {

  }

}
