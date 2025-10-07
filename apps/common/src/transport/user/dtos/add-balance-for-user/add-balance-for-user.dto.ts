import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from "class-validator";

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
        minimum: 0,
        example: 300
    })
    @IsInt()
    @Min(0)
    val: number;

    @ApiProperty({
        description: 'транзакция'
    })
    @IsString()
    ts: string;
}

