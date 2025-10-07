import { ApiProperty } from "@nestjs/swagger";

export class GetUserResponse {
    @ApiProperty({
        description: 'Идентификатор пользователя',
        example: '123',
    })
    id: string;

    @ApiProperty({
        description: 'Баланс пользователя',
        example: '3000',
    })
    balance: number;
}