import { IsNotEmpty, IsString } from "class-validator";

export class UpdateIkcoDto {    
    @IsString()
    @IsNotEmpty()
    car_name: string;

    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsString()
    description: string;
}