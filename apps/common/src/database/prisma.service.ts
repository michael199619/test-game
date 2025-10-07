import {
  INestApplication,
  Logger,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { setTimeout } from 'timers/promises';
import {
  BasePrismaClient,
  BasePrismaLogEvent,
  BasePrismaQueryEvent,
} from './prisma.interfaces';

export const prismaServiceFabric = <T extends BasePrismaClient>(
  prismaClient: T,
  name?: string,
) =>
  class PrismaService
    extends prismaClient
    implements OnApplicationBootstrap, OnApplicationShutdown {
    public logger: Logger = new Logger(name || PrismaService.name);

    constructor(...clientParams: ConstructorParameters<T> | any) {
      super({
        log: [
          {
            emit: 'event',
            level: 'query',
          },
          'warn',
          'error',
        ]
        ,
        ...clientParams,
      });
    }

    async seed(..._: unknown[]): Promise<any> {
      return;
    }

    async onApplicationBootstrap() {
      await this.connect();
      this.initQueryLog();
      await this.seed();
    }

    async onApplicationShutdown(signal?: string | undefined) {
      this.logger.warn(signal);
      await this.$disconnect();
    }

    async connect() {
      let tryNum = 3;
      do {
        this.logger.warn(`(${tryNum}) Try to connect to db`);
        try {
          await this.$connect();
          this.logger.log('DB connected!');
          break;
        } catch (e) {
          this.logger.error(`(${tryNum}) DB connection error`);
          if (--tryNum === 0) {
            throw e;
          }
          await setTimeout(1000);
        }
      } while (tryNum > 0);
    }

    async enableShutdownHooks(app: INestApplication) {
      this.$on('beforeExit', async () => {
        await app.close();
      });
    }

    isQueryEvent(
      event: BasePrismaQueryEvent | BasePrismaLogEvent | (() => Promise<void>),
    ): event is BasePrismaQueryEvent {
      return 'query' in event;
    }

    initQueryLog() {
      this.$on('query', event => {
        if (this.isQueryEvent(event)) {
          this.logger.verbose(
            `${event.duration} ms | ${JSON.stringify({
              query: event.query,
              params: event.params,
            })}`,
            name || prismaClient.name,
          );
        }
      });
    }
  };
