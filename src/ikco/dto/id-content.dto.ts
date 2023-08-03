import { IsMongoId, IsNotEmpty } from "class-validator";
export class ContentIdDto {
    @IsMongoId()
    @IsNotEmpty()
    id: string;
}