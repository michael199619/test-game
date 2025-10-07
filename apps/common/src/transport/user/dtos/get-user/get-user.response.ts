import { ApiProperty } from "@nestjs/swagger";
import { randomUUID } from "crypto";

export class GetUserResponse {
    @ApiProperty({
        description: 'Идентификатор пользователя',
        example: randomUUID(),
    })
    id: string;

    @ApiProperty({
        description: 'Баланс пользователя',
        example: '3000',
    })
    balance: number;
}