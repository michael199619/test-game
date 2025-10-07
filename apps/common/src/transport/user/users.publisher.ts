import { ControllerResponse } from "@game/common/utils";
import { ClientKafka } from "@nestjs/microservices";
import { UserTopics, userTopics } from "./constants";
import { AddBalanceForUserDto, AddBalanceForUserResponse, GetAllUsersDto, GetAllUsersResponse, GetUserDto, GetUserResponse } from "./dtos";
import { IUserController } from "./user.interface";

export class UsersPublisher implements IUserController {
    constructor(
        private kafkaService: ClientKafka
    ) {
    }

    private async onApplicationBootstrap() {
        userTopics.forEach(pattern => this.kafkaService.subscribeToResponseOf(pattern))
        await this.kafkaService.connect()
    }

    addBalanceForUser(dto: AddBalanceForUserDto): ControllerResponse<AddBalanceForUserResponse> {
        return this.kafkaService.send(UserTopics.ADD_BALANCE_FOR_USER, dto)
    }

    getAllUsers(dto: GetAllUsersDto): ControllerResponse<GetAllUsersResponse> {
        return this.kafkaService.send(UserTopics.GET_ALL_USERS, dto)

    }

    getUser(dto: GetUserDto): ControllerResponse<GetUserResponse> {
        return this.kafkaService.send(UserTopics.GET_USER, dto)
    }
}