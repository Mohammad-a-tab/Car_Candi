import { IsNotEmpty, IsString } from "class-validator";

export class UpdateIkcoDto {    
    @IsString()
    car_name?: string;

    @IsString()
    @IsNotEmpty()
    fieldName: string[];

    @IsString()
    id?: string;

    @IsString()
    title: string;
    
    @IsString()
    description: string;
}