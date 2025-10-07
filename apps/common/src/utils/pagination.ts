import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

export type IPaginationDto<T> = T & {
    limit: number
}

export type IPaginationResponse<data> = {
    data: data[],
    page: number
}

export class PaginationDto implements IPaginationDto<object> {
    @ApiProperty({
        description: 'Лимит',
        example: '10',
    })
    @IsInt()
    limit: number = 10;

    @ApiProperty({
        description: 'Страница',
        example: '10',
    })
    @IsInt()
    page: number = 1;
}

export class PaginationResponse implements Omit<IPaginationResponse<object>, 'data'> {
    @ApiProperty({
        description: 'Page',
        example: '10',
    })
    page: number;
}