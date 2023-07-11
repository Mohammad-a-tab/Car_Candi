import { IsMongoId, IsNotEmpty } from "class-validator";
export class IkcoIdDto {
    @IsMongoId()
    @IsNotEmpty()
    id: string;
}