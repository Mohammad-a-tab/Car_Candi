import { IsMongoId, IsNotEmpty, IsString } from "class-validator";
export class ContentFindOneDto {
    @IsMongoId()
    @IsNotEmpty()
    id: string;
    
    @IsString()
    @IsNotEmpty()
    fieldName: string[];
}