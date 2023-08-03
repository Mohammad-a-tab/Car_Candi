import { Body, Controller, Get, Param, Patch, Post, Query, UploadedFiles, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { IkcoService } from './ikco.service';
import { Ikco } from './ikco.model';
import { CreateIkcoDto } from './dto/create-ikco.dto';
import { IkcoIdDto } from './dto/id-ikco.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UpdateIkcoDto } from './dto/update-ikco.dto';
import { multerConfig } from 'src/utils/multer.config';
// import { ContentFindOneDto } from './dto/content-fineOne.dto';
import { Content } from './interface/content.interface';
import { ContentFindOneDto } from './dto/content-fineOne.dto';

@ApiTags('ikco')
@ApiBearerAuth()
@Controller('ikco')
// @UseGuards(AuthGuard())
@ApiSecurity('bearerAuth')
export class IkcoController {
    constructor(private readonly ikcoService: IkcoService) {}

    /**
     * Get all Ikco cars.
     */
    @Get()
    async findAll(): Promise<Ikco[]> {
        return this.ikcoService.findAll();
    }

    /**
     * Get a specific Ikco car by ID.
     * @param id The ID of the Ikco car.
     */
    @Get(':id')
    @ApiParam({ name: 'id', description: 'ID of the Ikco car' })
    getIkco(@Param() ikcoIdDto: IkcoIdDto): Promise<Ikco> {
        return this.ikcoService.getIkco(ikcoIdDto);
    }

    /**
     * Get a specific Content Ikco car by ID And Field Name.
     */
    @Get('/content/:id/name/:fieldName')
    @ApiParam({ name: 'id', type: String })
    @ApiParam({ name: 'fieldName', type: String })
    getIkcoContent(@Param() contentFineOneDto: ContentFindOneDto): Promise<Content> {
        return this.ikcoService.getIkcoContent(contentFineOneDto);
    }

    /**
     * Create a new Ikco car.
     * @param createIkcoDto The data to create the Ikco car.
     */
    @Post()
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiBody({ type: CreateIkcoDto, description: 'Data to create a new Ikco car' })
    async createIkco(@Body() createIkcoDto: CreateIkcoDto): Promise<Ikco> {
        return this.ikcoService.createIkco(createIkcoDto);
    }
    
    @Patch('update')
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        description: 'Update Images Ikco',
        schema: {
            type: 'object',
            properties: {
                car_name: { type: 'string' },
                id: { 
                    type: 'string',
                    description: 'این فیلد برای آپدیت محتوای از قبل ثبت شده الزامی است'
                },
                fieldName: { 
                    type: 'array', items: { type: "string", 
                    enum: ['Mechanicals', 'Engine', 'Air_bag', 'Injector', 'Wiring']} 
                },
                title: { type: 'string' },
                description: { type: 'string' },
                files: { 
                    type: 'array', items: { type: "string", format: "binary" }, 
                    description: 'لطفا در بارگذازی فایل ها از ارسال فایل با نام فارسی خودداری بفرمایید'
                },
            },
        },
    })
    @UseInterceptors(FilesInterceptor('files', 20, multerConfig))
    async updateIkco(
        @Body(new ValidationPipe()) updateIkcoDto: UpdateIkcoDto,
        @UploadedFiles(new ValidationPipe()) files
    ) {        
        return this.ikcoService.updateIkco(updateIkcoDto, files);        
    }
}