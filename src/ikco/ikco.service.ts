import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Ikco } from './ikco.model';
import { CreateIkcoDto } from './dto/create-ikco.dto';
import { IkcoIdDto } from './dto/id-ikco.dto';
import { UpdateIkcoDto } from './dto/update-ikco.dto';
// import { ContentFindOneDto } from './dto/content-fineOne.dto';
import { Content } from './interface/content.interface';
import {
  deleteInvalidPropertyInObject,
  editPaths,
  updateContentFunction,
} from 'src/utils/functions';
import { CreateIkcoFailedException, IkcoNotFoundException, UpdateFailedException } from './custom-exceptions';
import { ContentFindOneDto } from './dto/content-fineOne.dto';

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

    async getIkcoContent(contentFineOneDto: ContentFindOneDto): Promise<Content> {
        const { id, fieldName } = contentFineOneDto;
        const content = await this.getOneContent(fieldName, id);
        return content;
    }

    async createIkco(createIkcoDto: CreateIkcoDto): Promise<Ikco>{
        const { car_name } = createIkcoDto;
        const ikco = new this.ikcoModel({ car_name });
    
        try {
          return await ikco.save();
        } catch (error) {
          throw new CreateIkcoFailedException(error.message);
        }
    }

    async updateIkco(updateIkcoDto: UpdateIkcoDto, files): Promise<object>{
        try {
            const { id, car_name, fieldName, title, description } = updateIkcoDto;
            const { images, videos, pdfs } = editPaths(files);  
            const content = {
                title,
                description,
                images,
                videos,
                pdfs
            }
            deleteInvalidPropertyInObject(content);
            
            let UpdateResult;   
            if (id) {
                const oldContent = await this.getOneContent(fieldName, id);
                const updateContent = updateContentFunction(oldContent, content);
                UpdateResult = await this.ikcoModel.updateOne(
                  { [`${fieldName}._id`]: id },
                  {
                    $set: {[`${fieldName}.$`]: updateContent },
                  }
                );
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
            if (!UpdateResult) throw new Error('Update Failed');
            return UpdateResult;
        } catch (error) {
            throw new UpdateFailedException();
        }
    }

    async getOneContent(fieldName, contentId: string): Promise<Content> {
        const fieldsToProperties = {
          Mechanicals: 'Mechanicals',
          Injector: 'Injector',
          Air_bag: 'Air_bag',
          Wiring: 'Wiring',
          Engine: 'Engine',
        };

        const property = fieldsToProperties[fieldName];
        if (!property) {
          throw new BadRequestException('Invalid fieldName');
        }
    
        const ikco = await this.ikcoModel.findOne({ [`${property}._id`]: contentId });
        const content = ikco?.[property]?.[0];
    
        if (!ikco) {
            throw new IkcoNotFoundException(`fieldName: ${fieldName}, contentId: ${contentId}`);
        }
          if (!content) {
            throw new BadRequestException('Ikco is not defined');
        }
      
        return content;
    }
}
