import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    author: string;

    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    @IsInt()
    // parse pipe validator class type string to number but not the payload/request value
    // @Type(() => Number)
    // year: string;
    year: number;
}

export class UpdateBookDto {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    author: string;

    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    @IsInt()
    // parse pipe validator class type string to number but not the payload/request value
    // @Type(() => Number)
    // year: string;
    year: number;
}

export class FilterBookDto {
    @IsOptional()
    title: string;

    @IsOptional()
    author: string;

    @IsOptional()
    category: string;

    @IsOptional()
    min_year: number;

    @IsOptional()
    max_year: number;
}