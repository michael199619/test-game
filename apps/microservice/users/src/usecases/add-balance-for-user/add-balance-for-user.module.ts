import { Module } from "@nestjs/common";
import { PrismaModule } from "../../db/prisma.module";
import { AddBalanceForUserUsecase } from "./add-balance-for-user.usecase";

@Module({
    imports: [PrismaModule],
    providers: [AddBalanceForUserUsecase],
    exports: [AddBalanceForUserUsecase]
})
export class AddBalanceForUserModule { }
