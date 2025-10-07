import { Module } from "@nestjs/common";
import { GetUserUsecase } from "./get-user.usecase";

@Module({
    providers: [GetUserUsecase],
    exports: [GetUserUsecase]
})
export class GetUserModule { }
