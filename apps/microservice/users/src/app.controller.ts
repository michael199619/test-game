import { AddBalanceForUserDto, GetAllUsersDto, GetUserDto, IUserController, UserTopics } from '@game/common';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AddBalanceForUserUsecase } from './usecases/add-balance-for-user/add-balance-for-user.usecase';
import { GetAllUsersUsecase } from './usecases/get-all-users/get-all-users.usecase';
import { GetUserUsecase } from './usecases/get-user/get-user.usecase';

@Controller()
export class AppController implements IUserController {
  constructor(
    private readonly getUserUsecase: GetUserUsecase,
    private readonly getAllUsersUsecase: GetAllUsersUsecase,
    private readonly addBalanceForUserUsecase: AddBalanceForUserUsecase,
  ) {
  }

  @MessagePattern(UserTopics.GET_USER)
  async getUser(@Payload() data: GetUserDto) {
    return await this.getUserUsecase.excecute(data)
  }

  @MessagePattern(UserTopics.GET_ALL_USERS)
  async getAllUsers(@Payload() data: GetAllUsersDto) {
    return await this.getAllUsersUsecase.excecute(data)
  }

  @MessagePattern(UserTopics.ADD_BALANCE_FOR_USER)
  async addBalanceForUser(@Payload() data: AddBalanceForUserDto) {
    return await this.addBalanceForUserUsecase.excecute(data)
  }
}   