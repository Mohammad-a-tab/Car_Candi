import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductDTO {
    @IsNotEmpty()
    @IsString()
    car_name: string;
}