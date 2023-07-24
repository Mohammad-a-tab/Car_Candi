import { IsNotEmpty, IsString } from "class-validator";

export class CreateContentDto {    
    @IsString()
    @IsNotEmpty()
    car_name: string;

    @IsString()
    @IsNotEmpty()
    fieldName: string;

    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsString()
    description: string;
}
export class UpdateContentDto {    
    @IsString()
    @IsNotEmpty()
    car_name: string;

    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsString()
    description: string;
}