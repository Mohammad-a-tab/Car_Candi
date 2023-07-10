import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ikco } from './ikco.model';

@Injectable()
export class IkcoService {
    constructor(@InjectModel(Ikco.name) private ikcoModel: Model<Ikco>) {}
}
