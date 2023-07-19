import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ikco } from './ikco.model';
import { CreateIkcoDto } from './dto/create-ikco.dto';
import { IkcoIdDto } from './dto/id-ikco.dto';
import { ObjectId } from 'mongodb';
import { UpdateIkcoDto } from './dto/update-ikco.dto';
import { editPaths } from 'src/utils/functions';

@Injectable()
export class IkcoService {
    constructor(@InjectModel(Ikco.name) private ikcoModel: Model<Ikco>) {}

    async findAll(): Promise<Ikco[]>{
        return this.ikcoModel.find({}).lean();
    }
    async getIkco(ikcoIdDto: IkcoIdDto): Promise<Ikco>{
        const { id } = ikcoIdDto;
        const ikcoId = new ObjectId(id);
        const ikco = await this.ikcoModel.findById({ _id: ikcoId });
        return ikco;
    }
    async createIkco(createIkcoDto: CreateIkcoDto): Promise<Ikco>{
        const { car_name } = createIkcoDto;
        const ikco = new this.ikcoModel({ car_name});
        return ikco.save();
    }
    async updateIkco(updateIkcoDto: UpdateIkcoDto, files, id: string): Promise<object>{
        const { car_name, title, description } = updateIkcoDto;
        const { images, videos, pdfs } = editPaths(files);
        const mechanical = {
            title,
            description,
            images,
            videos,
            pdfs
        }
        const ikco = this.ikcoModel.updateOne({ car_name, 'mechanical._id': id }, { 
            $set: {
                mechanical: mechanical
            }
         })
        
        
        return ikco;
    }
}
