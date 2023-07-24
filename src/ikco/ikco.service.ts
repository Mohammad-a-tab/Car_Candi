import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Ikco } from './ikco.model';
import { CreateIkcoDto } from './dto/create-ikco.dto';
import { IkcoIdDto } from './dto/id-ikco.dto';
import { ObjectId } from 'mongodb';
import { CreateContentDto } from './dto/update-ikco.dto';
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
    async createContent(updateIkcoDto: CreateContentDto, files): Promise<object>{
        const { car_name, fieldName, title, description } = updateIkcoDto;
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
            UpdateResult = this.ikcoModel.updateOne({ car_name }, { 
                $push: {
                    mechanical: content 
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
    async updateContent(updateIkcoDto: CreateContentDto, files, id: string): Promise<object>{
        const { car_name, fieldName, title, description } = updateIkcoDto;
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
            UpdateResult = this.ikcoModel.updateOne({ car_name }, { 
                $push: {
                    mechanical: content 
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
}
