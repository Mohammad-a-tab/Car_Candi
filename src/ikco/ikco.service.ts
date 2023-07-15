import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ikco } from './ikco.model';
import { CreateIkcoDto } from './dto/create-ikco.dto';
import { IkcoIdDto } from './dto/id-ikco.dto';
import { ObjectId } from 'mongodb';
import { UpdateIkcoDto } from './dto/update-ikco.dto';

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
    async updateIkco(updateIkcoDto: UpdateIkcoDto, car_name: string, fieldName: string): Promise<object>{
        // const { title, description } = updateIkcoDto;
        // const ikco = await this.ikcoModel.findOne({ car_name }).lean();
        let updateResult = {};
        if (fieldName === 'مکانیکی') {
            updateResult = await this.ikcoModel.updateOne({ car_name }, { 
                $set: { mechanical: updateIkcoDto }
            })
        }
        else if (fieldName === 'انژکتوری') {}
        else if (fieldName === 'کیسه هوا') {}
        else if (fieldName === 'سیم کشی') {}
        else if (fieldName === 'موتور') {}
        return updateResult
    }
}
