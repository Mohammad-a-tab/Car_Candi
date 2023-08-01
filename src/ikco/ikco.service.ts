import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ikco } from './ikco.model';
import { CreateIkcoDto } from './dto/create-ikco.dto';
import { IkcoIdDto } from './dto/id-ikco.dto';
import { ObjectId } from 'mongodb';
import { UpdateIkcoDto } from './dto/update-ikco.dto';
import { 
    deleteInvalidPropertyInObject,
    editPaths,
    updateContentFunction 
} from 'src/utils/functions';
import { ikco } from './interface/ikco.interface';
import { content } from './interface/content.interface';
import { Model } from 'mongoose';

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
        try {
            const { car_name } = createIkcoDto;
            const ikco = new this.ikcoModel({ car_name});
            return ikco.save();
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async updateIkco(updateIkcoDto: UpdateIkcoDto, files): Promise<object>{
        try {
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
                    $set: {[`${fieldName}.$`]: updateContent }
                });
                if (!updateContent) throw new Error('Update Failed');
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
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async getOneContent(fieldName, contentId: string): Promise<content> {
        let ikco: ikco;
        let content: content;
        if (fieldName === 'Mechanicals') {
            ikco = await this.ikcoModel.findOne({ 'Mechanicals._id': contentId });
            content = ikco?.Mechanicals?.[0]
        }
        else if (fieldName === 'Injector') {
            ikco = await this.ikcoModel.findOne({ 'Injector._id': contentId });
            content = ikco?.Injector?.[0]
        }
        else if (fieldName === 'Air_bag') {
            ikco = await this.ikcoModel.findOne({ 'Air_bag._id': contentId });
            content = ikco?.Air_bag?.[0]
        }
        else if (fieldName === 'Wiring') {
            ikco = await this.ikcoModel.findOne({ 'Wiring._id': contentId });
            content = ikco?.Wiring?.[0]
        }
        else if (fieldName === 'Engine') {
            ikco = await this.ikcoModel.findOne({ 'Engine._id': contentId });
            content = ikco?.Engine?.[0]
        }
        if(!ikco) throw new BadRequestException("No Ikco was found with this specification");
        if(!content) throw new BadRequestException("ikco is not defined");
        return content
    }
}
