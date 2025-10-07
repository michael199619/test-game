import { ApiProperty } from "@nestjs/swagger";
import { ValidateNested } from "class-validator";
import { IPaginationResponse, PaginationResponse } from "../../../../utils";

export class GetAllUsers {
    @ApiProperty({
        description: 'Идентификатор пользователя'
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
