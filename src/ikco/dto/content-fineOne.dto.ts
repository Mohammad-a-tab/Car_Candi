import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
export class ContentFindOneDto {
    @ApiProperty({ description: 'Id of the Content Ikco car' })
    @IsMongoId()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    fieldName: string;
}