import { ClientKafka } from "@nestjs/microservices";
import { UserTopics, userTopics } from "./constants";
import { AddBalanceForUserDto, AddBalanceForUserResponse, GetAllUsersDto, GetAllUsersResponse, GetUserDto, GetUserResponse } from "./dtos";
import { IUserController } from "./user.interface";

export class UsersPublisher implements IUserController {
    constructor(
        private kafkaService: ClientKafka
    ) {
    }

    async onApplicationBootstrap() {
        userTopics.forEach(pattern => this.kafkaService.subscribeToResponseOf(pattern))
        await this.kafkaService.connect();
    }

    addBalanceForUser(dto: AddBalanceForUserDto) {
        return this.kafkaService.send<AddBalanceForUserResponse>(UserTopics.ADD_BALANCE_FOR_USER, dto)
    }

    getAllUsers(dto: GetAllUsersDto) {
        return this.kafkaService.send<GetAllUsersResponse>(UserTopics.GET_ALL_USERS, dto)
    }

    getUser(dto: GetUserDto) {
        return this.kafkaService.send<GetUserResponse>(UserTopics.GET_USER, dto)
    }
}