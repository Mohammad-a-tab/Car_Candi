import { IsNotEmpty, IsString } from "class-validator";

export class CreateIkcoDto {
    @IsNotEmpty()
    @IsString()
    car_name: string;
}