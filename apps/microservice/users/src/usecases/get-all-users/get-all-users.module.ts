import { Module } from "@nestjs/common";
import { GetAllUsersUsecase } from "./get-all-users.usecase";

@Module({
    providers: [GetAllUsersUsecase],
    exports: [GetAllUsersUsecase]
})
export class GetAllUsersModule { }
