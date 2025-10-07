import { ApiProperty } from "@nestjs/swagger";
import { randomUUID } from "crypto";

export class AddBalanceForUserResponse {
    @ApiProperty({
        description: 'Баланс',
        example: randomUUID(),
    })
    balance: number;
}