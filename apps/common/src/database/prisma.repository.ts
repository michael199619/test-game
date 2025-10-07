
import {
  BasePrismaClient,
  BaseTransactionClient,
  BaseTransactionIsolationLevel,
  BaseTransactionOptions,
  PrismaClientWithTransaction,
} from './prisma.interfaces';

export abstract class PrismaRepository<
  PrismaServiceType extends BasePrismaClient,
  TransactionClient extends BaseTransactionClient,
  TransactionIsolationLevel extends BaseTransactionIsolationLevel = BaseTransactionIsolationLevel,
> {
  constructor(
    protected readonly prisma: PrismaClientWithTransaction<
      PrismaServiceType,
      TransactionClient,
      TransactionIsolationLevel
    >,
  ) { }

  /**
   * Необходим для обеспечения единообразия в прототипах методов репозитория и исключения возникновения неочевидных багов, когда вызывается метод transaction с обычным `PrismaClient` (this.prisma), а не `Prisma.TransactionClient`
   */
  protected getContext(
    tx:
      | TransactionClient
      | Omit<
        PrismaClientWithTransaction<
          PrismaServiceType,
          TransactionClient,
          TransactionIsolationLevel
        >,
        '$transaction'
      > = this.prisma,
  ) {
    return tx as TransactionClient;
  }

  /**
   * Метод-обёртка над транзакциями
   * @param tx если `undefined` - стартует новую транзакцию, иначе исполняет `cb` в контексте переданной
   * @param cb коллбэк-функция с запросами к БД, которые должны выполниться в транзакции
   * @param options опции транзакции, применяются только для новой транзакции
   * @returns результат `cb`
   */
  public async transaction<R>(
    tx: TransactionClient | undefined,
    cb: (tx: TransactionClient) => Promise<R>,
    options?: BaseTransactionOptions<TransactionIsolationLevel>,
  ) {
    if (!tx) {
      return this.prisma.$transaction<R>(async tx => cb(tx), options);
    }
    return cb(tx);
  }
}
