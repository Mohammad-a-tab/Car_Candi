import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Ikco } from './ikco.model';
import { CreateIkcoDto } from './dto/create-ikco.dto';
import { IkcoIdDto } from './dto/id-ikco.dto';
import { ObjectId } from 'mongodb';
import { CreateContentDto, UpdateContentDto } from './dto/update-ikco.dto';
import { editPaths } from 'src/utils/functions';
import { ikco } from './interface/ikco.interface';

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
    async createContent(createContentDto: CreateContentDto, files): Promise<object>{
        const { car_name, fieldName, title, description } = createContentDto;
        const { images, videos, pdfs } = editPaths(files);
        let UpdateResult = {}
        const content = {
            // _id: new mongoose.Types.ObjectId(),
            title,
            description,
            images,
            videos,
            pdfs
        }
        if (fieldName === "مکانیکی") {
            UpdateResult = this.ikcoModel.updateOne({ car_name }, { 
                $push: {
                    Mechanicals: content 
                }
            });
        }
        else if (fieldName === "انژکتور") {
            UpdateResult = this.ikcoModel.updateOne({ car_name }, { 
                $push: {
                    Injector: content 
                }
            });
        }
        else if (fieldName === "موتور") {
            UpdateResult = this.ikcoModel.updateOne({ car_name }, { 
                $push: {
                    Engine: content 
                }
            });
        }
        else if (fieldName === "کیسه هوا") {
            UpdateResult = this.ikcoModel.updateOne({ car_name }, { 
                $push: {
                    Air_bag: content 
                }
            });
        }
        else if (fieldName === "سیم کشی") {
            UpdateResult = this.ikcoModel.updateOne({ car_name }, { 
                $push: {
                    Wiring: content 
                }
            });
        }
        else {
            UpdateResult = {
                message: 'Update failed'
            }
        } 
        return UpdateResult;
    }
    async updateContent(updateContentDto: UpdateContentDto, files): Promise<object>{
        const { id, fieldName, title, description } = updateContentDto;
        const { images, videos, pdfs } = editPaths(files);
        let UpdateResult = {}
        const content = {
            _id: new mongoose.Types.ObjectId(),
            title,
            description,
            images,
            videos,
            pdfs
        }
        if (fieldName === "مکانیکی") {
            UpdateResult = this.ikcoModel.updateOne({ "Mechanicals._id": id }, { 
                $set: {
                    'Mechanicals.$': content 
                }
            });
        }
        else if (fieldName === "انژکتور") {
            UpdateResult = this.ikcoModel.updateOne({ "Injector._id": id }, { 
                $push: {
                    Injector: content 
                }
            });
        }
        else if (fieldName === "موتور") {
            UpdateResult = this.ikcoModel.updateOne({ "Engine._id": id }, { 
                $push: {
                    Engine: content 
                }
            });
        }
        else if (fieldName === "کیسه هوا") {
            UpdateResult = this.ikcoModel.updateOne({ "Air_bag._id": id }, { 
                $push: {
                    Air_bag: content 
                }
            });
        }
        else if (fieldName === "سیم کشی") {
            UpdateResult = this.ikcoModel.updateOne({ "Wiring._id": id }, { 
                $push: {
                    Wiring: content 
                }
            });
        }
        else {
            UpdateResult = {
                message: 'Update failed'
            }
        } 
        const ikco = await this.ikcoModel.findOne({'Mechanicals._id' : id})
        return UpdateResult;
    }
    async getOneContent(fieldName: string, contentId: string) {
        let ikco: ikco;
        let content = {}
        if (fieldName === "مکانیکی") {
            ikco = await this.ikcoModel.findOne({'Mechanicals._id': contentId})
            content = ikco?.Mechanicals?.[0]
        }
        else if (fieldName === "انژکتور") {
            ikco = await this.ikcoModel.findOne({'Injector._id': contentId})
            content = ikco?.Injector?.[0]
        }
        else if (fieldName === "موتور") {
            ikco = await this.ikcoModel.findOne({'Engine': contentId})
            content = ikco?.Engine?.[0]
        }
        else if (fieldName === "کیسه هوا") {
            ikco = await this.ikcoModel.findOne({'Air_bag._id': contentId})
            content = ikco?.Air_bag?.[0]
        }
        else if (fieldName === "سیم کشی") {
            ikco = await this.ikcoModel.findOne({'Wiring._id': contentId})
            content = ikco?.Wiring?.[0]
        }
        if(!ikco) throw new BadRequestException("No Ikco was found with this specification");
        if(!content) throw new BadRequestException("Ikco not found")
        return content
    }
}
