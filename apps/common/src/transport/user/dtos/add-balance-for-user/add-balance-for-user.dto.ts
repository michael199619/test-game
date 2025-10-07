import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsPositive, IsString, IsUUID, Min } from "class-validator";
import { randomUUID } from "crypto";

export enum Action {
    INCOME = 'INCOME',
    EXPENSE = 'EXPENSE'
}

export class AddBalanceForUserDto {
    @ApiProperty({
        description: 'Идентификатор пользователя',
        type: String,
        example: randomUUID(),
    })
    @IsString()
    @IsUUID()
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
        minimum: 0,
        example: 300
    })
    @IsInt()
    @Min(0)
    @IsPositive()
    val: number;

    @ApiProperty({
        description: 'Транзакция пополнения (должна быть уникальна)',
        type: String,
        required: false,
        example: randomUUID(),
    })
    @IsString()
    @IsUUID()
    transactionId: string;
}

