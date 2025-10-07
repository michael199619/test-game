export type BasePrismaQueryEvent = {
  timestamp: Date;
  query: string;
  params: string;
  duration: number;
  target: string;
};

export type BasePrismaLogEvent = {
  timestamp: Date;
  message: string;
  target: string;
};

export type BasePrismaServiceEvent =
  | BasePrismaQueryEvent
  | BasePrismaLogEvent
  | (() => Promise<void>);

export type BaseTransactionIsolationLevel =
  | 'ReadUncommitted'
  | 'ReadCommitted'
  | 'RepeatableRead'
  | 'Serializable';

export type BasePrismaClient = new (...args: any[]) => {
  $connect(): Promise<void>;
  $disconnect(): Promise<void>;
  $on(
    eventName: unknown,
    cb: (event: BasePrismaServiceEvent, ...args: unknown[]) => void,
  ): void;
};

export interface BaseTransactionOptions<
  TransactionIsolationLevel extends BaseTransactionIsolationLevel = BaseTransactionIsolationLevel,
> {
  maxWait?: number;
  timeout?: number;
  isolationLevel?: TransactionIsolationLevel;
}

export type AsyncTransaction<
  TransactionClient extends BaseTransactionClient,
  TransactionIsolationLevel extends BaseTransactionIsolationLevel = BaseTransactionIsolationLevel,
> = <R>(
  cb: (tx: TransactionClient) => Promise<R>,
  options?: BaseTransactionOptions<TransactionIsolationLevel>,
) => Promise<R>;

export type BaseTransactionClient<
  T extends BasePrismaClient = BasePrismaClient,
> = Omit<T, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>;

export type PrismaClientWithTransaction<
  PrismaServiceType extends BasePrismaClient = BasePrismaClient,
  TransactionClient extends BaseTransactionClient = BaseTransactionClient,
  TransactionIsolationLevel extends BaseTransactionIsolationLevel = BaseTransactionIsolationLevel,
> = InstanceType<PrismaServiceType> & {
  $transaction: AsyncTransaction<TransactionClient, TransactionIsolationLevel>;
};
