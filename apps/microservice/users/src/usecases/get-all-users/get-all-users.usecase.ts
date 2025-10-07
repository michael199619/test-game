import { GetAllUsersDto, GetAllUsersResponse, IUserController, Usecase } from "@game/common";
import { Injectable } from "@nestjs/common";
import { UsersRepository } from "../../db/users/users.repository";

@Injectable()
export class GetAllUsersUsecase extends Usecase<IUserController['getAllUsers']> {
    constructor(
        private readonly usersRepository: UsersRepository
    ) {
        super()
    }

    async handler(dto: GetAllUsersDto): Promise<GetAllUsersResponse> {
        const { data, total } = await this.usersRepository.getAllUsers(dto);

        return {
            data,
            page: dto.page,
            total: total
        };
    }
}