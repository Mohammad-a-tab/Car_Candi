import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateIkcoDto {
    @ApiProperty({ description: 'Name of the Ikco car' })
    @IsString()
    @IsNotEmpty()
    car_name: string;
}