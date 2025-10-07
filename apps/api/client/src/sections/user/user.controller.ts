import { AddBalanceForUserDto, GetAllUsersDto, UsersPublisher } from '@game/common';
import { Body, Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller()
export class UserController {
    constructor(
        private readonly usersPublisher: UsersPublisher
    ) {

    }

    @Get()
    async getAllUsers(
        @Query() dto: GetAllUsersDto
    ) {
        return this.usersPublisher.getAllUsers(dto)
    }

    @Get(':id')
    async getUser(
        @Param('id') id: string
    ) {
        return this.usersPublisher.getUser({ id })
    }

    @Get('change-balance')
    async changeBalance(
        @Body() dto: AddBalanceForUserDto
    ) {
        return this.usersPublisher.addBalanceForUser(dto)
    }
} 