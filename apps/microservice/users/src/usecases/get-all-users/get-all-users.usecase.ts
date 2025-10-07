import { GetAllUsersDto, GetAllUsersResponse, IUserController, Usecase } from "@game/common";
import { UsersRepository } from "../../db/users/users.repository";

export class GetAllUsersUsecase extends Usecase<IUserController['getAllUsers']> {
    constructor(
        private readonly usersRepository: UsersRepository
    ) {
        super()
    }

    async handler(dto: GetAllUsersDto): Promise<GetAllUsersResponse> {
        const users = await this.usersRepository.getAllUsers(dto);

        return {
            data: users,
            page: dto.page
        };
    }
}