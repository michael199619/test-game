import { GetUserDto, GetUserResponse, IUserController, Usecase } from "@game/common";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "../../db/users/users.repository";

@Injectable()
export class GetUserUsecase extends Usecase<IUserController['getUser']> {
    constructor(
        private readonly usersRepository: UsersRepository
    ) {
        super()

    }

    async handler(dto: GetUserDto): Promise<GetUserResponse> {
        const user = await this.usersRepository.getUserById(dto.id);

        if (!user) {
            throw new NotFoundException('user is not exists');
        }

        return user;
    }
}