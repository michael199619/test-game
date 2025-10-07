import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class GetUserDto {
    @ApiProperty({
        description: 'Идентификатор пользователя',
        example: '123',
    })
    @IsString()
    id: string
}