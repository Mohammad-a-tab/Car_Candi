import { IsNotEmpty, IsString } from "class-validator";

export class UpdateIkcoDto {    
    @IsString()
    @IsNotEmpty()
    title: string;
    
    @IsString()
    description: string;
}