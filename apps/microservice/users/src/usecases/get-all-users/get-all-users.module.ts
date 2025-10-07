import { Module } from "@nestjs/common";
import { PrismaModule } from "../../db/prisma.module";
import { GetAllUsersUsecase } from "./get-all-users.usecase";

@Module({
    imports: [PrismaModule],
    providers: [GetAllUsersUsecase],
    exports: [GetAllUsersUsecase]
})
export class GetAllUsersModule { }
