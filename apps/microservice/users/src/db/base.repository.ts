import { PrismaRepository } from '@game/common';
import { Prisma, PrismaService } from './prisma.service';

export abstract class Repository extends PrismaRepository<
  typeof PrismaService,
  Prisma.TransactionClient,
  Prisma.TransactionIsolationLevel
> {
  protected constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
