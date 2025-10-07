import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export enum Action {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE'
}

export class AddBalanceForUserDto {
    @ApiProperty({
        description: 'Идентификатор пользователя',
        type: String,
        example: '322',
    })
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty({
        description: 'Действие',
        enum: Action,
        example: Action.INCOME,
    })
    @IsEnum(Action)
    action: Action;

    @ApiProperty({
        description: 'Сумма',
        type: Number,
        example: 300
    })
    @IsNumber()
    val: number;

    @ApiProperty({
        description: 'транзакция'
    })
    @IsString()
    ts: string;
}

