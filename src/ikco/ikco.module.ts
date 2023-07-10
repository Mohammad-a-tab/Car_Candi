import { Module } from '@nestjs/common';
import { IkcoController } from './ikco.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { IkcoService } from './ikco.service';
import { Ikco, IkcoSchema } from './ikco.model';
@Module({
    imports: [MongooseModule.forFeature([{ name: Ikco.name, schema: IkcoSchema }])],
    controllers : [IkcoController],
    providers : [IkcoService],
})
export class IkcoModule {}
