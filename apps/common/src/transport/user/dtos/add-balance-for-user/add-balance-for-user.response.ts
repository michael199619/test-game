import { ApiProperty } from "@nestjs/swagger";

export class AddBalanceForUserResponse {
    @ApiProperty({
        description: 'Баланс',
        example: '123',
    })
    balance: number;
}