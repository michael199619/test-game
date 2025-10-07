import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsInt, IsPositive, Min } from "class-validator";

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
        type: Number,
        example: 10,
    })
    @Transform(({ value = 10 }) => +value)
    @IsInt()
    @Min(0)
    @IsPositive()
    limit: number = 10;

    @ApiProperty({
        description: 'Страница',
        example: 1,
        type: Number,
    })
    @Transform(({ value = 10 }) => +value)
    @IsInt()
    @Min(0)
    @IsPositive()
    page: number = 1;
}

export class PaginationResponse implements Omit<IPaginationResponse<object>, 'data'> {
    @ApiProperty({
        description: 'Страница',
        example: '10',
    })
    page: number;

    @ApiProperty({
        description: 'Всего страниц',
        example: '10',
    })
    total: number;
}