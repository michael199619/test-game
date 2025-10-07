import { Module } from "@nestjs/common";
import { AddBalanceForUserUsecase } from "./add-balance-for-user.usecase";

@Module({
    providers: [AddBalanceForUserUsecase],
    exports: [AddBalanceForUserUsecase]
})
export class AddBalanceForUserModule { }
