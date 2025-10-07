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
  getUser(@Payload() data: GetUserDto) {
    return this.getUserUsecase.excecute(data)
  }

  @MessagePattern(UserTopics.GET_ALL_USERS)
  getAllUsers(@Payload() data: GetAllUsersDto) {
    return this.getAllUsersUsecase.excecute(data)
  }

  @MessagePattern(UserTopics.ADD_BALANCE_FOR_USER)
  addBalanceForUser(@Payload() data: AddBalanceForUserDto) {
    return this.addBalanceForUserUsecase.excecute(data)
  }
}  