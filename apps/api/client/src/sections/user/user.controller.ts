import { AddBalanceForUserDto, AddBalanceForUserResponse, GetAllUsersDto, GetAllUsersResponse, UsersPublisher } from '@game/common';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller()
export class UserController {
    constructor(
        private readonly usersPublisher: UsersPublisher
    ) {

    }

    @Get()
    @ApiResponse({
        type: GetAllUsersResponse
    })
    async getAllUsers(
        @Query() dto: GetAllUsersDto
    ) {
        return this.usersPublisher.getAllUsers({
            ...dto,
            limit: +dto.limit,
            page: +dto.page,
        })
    }

    @Get(':id')
    async getUser(
        @Param('id') id: string
    ) {
        return this.usersPublisher.getUser({ id })
    }

    @Post('change-balance')
    @ApiResponse({
        type: AddBalanceForUserResponse
    })
    async changeBalance(
        @Body() dto: AddBalanceForUserDto
    ) {
        return this.usersPublisher.addBalanceForUser(dto)
    }
} 