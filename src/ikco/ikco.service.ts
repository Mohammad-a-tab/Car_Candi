import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Ikco } from './ikco.model';
import { CreateIkcoDto } from './dto/create-ikco.dto';
import { IkcoIdDto } from './dto/id-ikco.dto';
import { ObjectId } from 'mongodb';
import { UpdateIkcoDto } from './dto/update-ikco.dto';
import { deleteInvalidPropertyInObject, editPaths, removeFieldEmpty, updateContentFunction } from 'src/utils/functions';
import { ikco } from './interface/ikco.interface';
import { content } from './interface/content.interface';

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
    async updateIkco(updateIkcoDto: UpdateIkcoDto, files): Promise<object>{
        const { id, car_name, fieldName, title, description } = updateIkcoDto;
        const { images, videos, pdfs } = editPaths(files);  
        let UpdateResult = {}
        const content = {
            title,
            description,
            images,
            videos,
            pdfs
        }
        deleteInvalidPropertyInObject(content);
        if (id) {
            const oldContent = await this.getOneContent(fieldName, id);
            const updateContent = updateContentFunction(oldContent, content);
            UpdateResult = await this.ikcoModel.updateOne({[`${fieldName}._id`]: id}, {
                $set: { [`${fieldName}.$`]: updateContent }
            });
            if (!updateContent) return { message: 'Update Failed' }
            UpdateResult = await this.ikcoModel.findOne({ [`${fieldName}._id`]: id }).lean();
        }
        else {
            await this.ikcoModel.updateOne({ car_name }, { 
                $push: {
                    [`${fieldName}`]: content 
                }
            });
            UpdateResult = await this.ikcoModel.findOne({ car_name }).lean();
        }
        return UpdateResult;
    }
    async getOneContent(fieldName, contentId: string): Promise<content> {
        try {
            const ikco = await this.ikcoModel.findOne({ [`${fieldName}._id`]: contentId});
            const content = ikco?.Mechanicals?.[0]
            return content
        } catch (error) {
            throw new BadRequestException("No Ikco was found with this specification", error.message);
        }
    }
}
