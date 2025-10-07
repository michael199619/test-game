import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";
import { randomUUID } from "crypto";

export class GetUserDto {
    @ApiProperty({
        description: 'Идентификатор пользователя',
        example: randomUUID(),
    })
    @IsString()
    @IsUUID()
    id: string
}