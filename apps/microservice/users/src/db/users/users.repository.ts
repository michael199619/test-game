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
        return this.prisma.user.findFirst({ select: { id: true, balance: true }, where: { id } })
    }

    getAllUsers({ limit }: GetAllUsersDto) {
        return this.prisma.user.findMany({ select: { id: true } })
    }

    getHistory(id: string, tx: Prisma.TransactionClient | undefined) {
        return this.getContext(tx).user.findFirst({
            where: { id },
            select: {
                historyBalance: {
                    select: {
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
                value: dto.value
                //  ts: dto.ts,
            }
        })
    }
} 