import { Action, AddBalanceForUserDto, AddBalanceForUserResponse, IUserController, Usecase } from "@game/common";
import { BadRequestException, NotFoundException } from "@nestjs/common";
import { UsersRepository } from "../../db/users/users.repository";

export class AddBalanceForUserUsecase extends Usecase<IUserController['addBalanceForUser']> {
    constructor(
        private readonly usersRepository: UsersRepository
    ) {
        super()
    }

    async handler(dto: AddBalanceForUserDto): Promise<AddBalanceForUserResponse> {
        return this.usersRepository.transaction(undefined, async (tx) => {
            const user = await this.usersRepository.getHistory(dto.id, tx);

            if (!user) {
                throw new NotFoundException('user is not exists');
            }

            const balance = user.historyBalance.reduce((prev, next) => {
                return next.action === Action.EXPENSE ? prev - next.value : prev + next.value
            }, dto.action === Action.EXPENSE ? -dto.value : dto.value);

            if (dto.action === Action.EXPENSE && balance < 0) {
                throw new BadRequestException('balance < value');
            }

            await Promise.all([
                this.usersRepository.addBalance(dto, tx),
                this.usersRepository.updateBalanceUser(dto.id, balance, tx)
            ]);

            return { balance }
        });
    }
}