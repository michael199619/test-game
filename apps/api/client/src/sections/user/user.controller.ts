import { AddBalanceForUserDto, AddBalanceForUserResponse, GetAllUsersDto, GetAllUsersResponse, GetUserResponse, UsersPublisher } from '@game/common';
import { Body, Controller, Get, Param, ParseUUIDPipe, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { lastValueFrom } from 'rxjs';

@ApiTags('users')
@Controller()
export class UserController {
    constructor(
        private readonly usersPublisher: UsersPublisher
    ) { }

    @Get()
    @ApiResponse({
        description: 'Получить всех пользователей',
        type: GetAllUsersResponse
    })
    getAllUsers(
        @Query() dto: GetAllUsersDto
    ) {
        return lastValueFrom(this.usersPublisher.getAllUsers(dto))
    }

    @Get(':id')
    @ApiResponse({
        description: 'Получить профиль пользователя',
        type: GetUserResponse
    })
    getUser(
        @Param('id', ParseUUIDPipe) id: string
    ) {
        return lastValueFrom(this.usersPublisher.getUser({ id }))
    }

    @Post('change-balance')
    @ApiResponse({
        description: 'Изменить баланс пользователя',
        type: AddBalanceForUserResponse
    })
    changeBalance(
        @Body() dto: AddBalanceForUserDto
    ) {
        return lastValueFrom(this.usersPublisher.addBalanceForUser(dto));
    }
} 