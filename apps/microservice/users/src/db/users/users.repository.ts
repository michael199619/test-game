import { AddBalanceForUserDto, GetAllUsersDto } from "@game/common";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { Repository } from "../base.repository";
import { PrismaService } from "../prisma.service";

@Injectable()
export class UsersRepository extends Repository {
    constructor(
        prisma: PrismaService,
    ) {
        super(prisma);
    }

    getUserById(id: string) {
        return this.prisma.user.findFirst({ select: { id: true, balance: true }, where: { id } });
    }

    async getAllUsers({ limit, page }: GetAllUsersDto) {
        const [data, total] = await Promise.all([
            this.prisma.user.findMany({ select: { id: true }, take: limit, skip: (page - 1) * limit }),
            this.prisma.user.count(),
        ]);

        return { data, total }
    }

    getTransaction(transactionId: string, tx: Prisma.TransactionClient | undefined) {
        return this.getContext(tx).balance.findFirst({ where: { transactionId } })
    }

    getHistory(id: string, tx: Prisma.TransactionClient | undefined) {
        return this.getContext(tx).user.findFirst({
            where: { id },
            select: {
                historyBalance: {
                    select: {
                        transactionId: true,
                        action: true,
                        value: true
                    }
                }
            }
        });
    }

    updateBalanceUser(id: string, balance: number, tx: Prisma.TransactionClient | undefined) {
        return this.getContext(tx).user.update({
            where: { id },
            data: {
                balance,
            }
        })
    }

    addBalance(dto: AddBalanceForUserDto, tx: Prisma.TransactionClient | undefined) {
        return this.getContext(tx).balance.create({
            data: {
                action: dto.action,
                userId: dto.id,
                value: dto.val,
                transactionId: dto.transactionId
            }
        })
    }
} 