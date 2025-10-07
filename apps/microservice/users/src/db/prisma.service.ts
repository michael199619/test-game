import { Action, prismaServiceFabric } from '@game/common';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PrismaClient } from 'prisma_types/users';
import { appConfig } from '../modules/config/config';
import { seed } from './users/users';
export * from 'prisma_types/users';


@Injectable()
export class PrismaService extends prismaServiceFabric(
  PrismaClient,
  'UsersPrismaService',
) {
  constructor(
    @Inject(appConfig.KEY) private readonly config: ConfigType<typeof appConfig>
  ) {
    super();
  }

  async seed() {
    if (!this.config.seed) {
      return;
    }

    this.logger.log('users seed');
    const now = new Date()

    await Promise.all(seed.map(async userSeed => {
      const user = await this.user.upsert({
        select: { createdAt: true },
        where: { id: userSeed.id },
        update: {},
        create: {
          id: userSeed.id,
          balance: userSeed.balance,
          createdAt: now
        }
      })

      if (+user.createdAt === +now) {
        await this.balance.create({
          data: {
            userId: userSeed.id,
            action: Action.INCOME,
            value: userSeed.balance
          }
        })
      }
    }))

    this.logger.log('users seed is finished')
  }
}
