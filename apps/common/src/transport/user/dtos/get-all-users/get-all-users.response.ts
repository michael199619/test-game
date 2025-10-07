import { ApiProperty } from "@nestjs/swagger";
import { ValidateNested } from "class-validator";
import { randomUUID } from "crypto";
import { IPaginationResponse, PaginationResponse } from "../../../../utils";

export class GetAllUsers {
    @ApiProperty({
        description: 'Идентификатор пользователя',
        example: randomUUID()
    })
    id: string;
}

export class GetAllUsersResponse extends PaginationResponse implements IPaginationResponse<GetAllUsers> {
    @ApiProperty({
        description: 'Массив пользователей',
        type: GetAllUsers,
        isArray: true
    })
    @ValidateNested()
    data: GetAllUsers[];
}
