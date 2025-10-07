import { Module } from "@nestjs/common";
import { PrismaModule } from "../../db/prisma.module";
import { GetUserUsecase } from "./get-user.usecase";

@Module({
    imports: [PrismaModule],
    providers: [GetUserUsecase],
    exports: [GetUserUsecase]
})
export class GetUserModule { }
