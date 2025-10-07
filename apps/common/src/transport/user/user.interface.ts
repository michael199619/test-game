import { ControllerResponse } from "../../utils";
import { GetAllUsersDto, GetAllUsersResponse, GetUserDto, GetUserResponse } from "./dtos";
import { AddBalanceForUserDto } from "./dtos/add-balance-for-user/add-balance-for-user.dto";
import { AddBalanceForUserResponse } from "./dtos/add-balance-for-user/add-balance-for-user.response";

export interface IUserTransportOptions {
    clientId: string;
    kafkaBrokers: string[];
}

export type IUserController = {
    getUser: (dto: GetUserDto) => ControllerResponse<GetUserResponse>
    getAllUsers: (dto: GetAllUsersDto) => ControllerResponse<GetAllUsersResponse>
    addBalanceForUser: (dto: AddBalanceForUserDto) => ControllerResponse<AddBalanceForUserResponse>
}