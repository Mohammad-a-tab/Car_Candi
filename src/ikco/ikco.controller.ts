import { Body, Controller, Get, Param, Patch, Post, UploadedFiles, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { IkcoService } from './ikco.service';
import { Ikco } from './ikco.model';
import { CreateIkcoDto } from './dto/create-ikco.dto';
import { IkcoIdDto } from './dto/id-ikco.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateContentDto } from './dto/update-ikco.dto';
import { multerConfig } from 'src/utils/multer.config';

@ApiTags('ikco')
@ApiBearerAuth()
@Controller('ikco')
// @UseGuards(AuthGuard())
@ApiSecurity('bearerAuth')
export class IkcoController {
    constructor(
        private readonly ikcoService: IkcoService
    ) { }

    @Get()
    async findAll(): Promise<Ikco[]> {
        return this.ikcoService.findAll();
    }

    @Get('/:id')
    @ApiParam({
        name: 'id',
        type: 'string',
        description: 'Id of the Ikco',
    })
    getIkco(@Param(new ValidationPipe()) ikcoIdDto: IkcoIdDto): Promise<Ikco> {
        return this.ikcoService.getIkco(ikcoIdDto);
    }

    @Post('add')
    @ApiConsumes("application/x-www-form-urlencoded")
    @ApiBody({
        description: 'Create Ikco',
        schema: {
            type: 'object',
            properties: {
                car_name : { type: 'string' },
            },
            required: ['car_name'],
        },
    })
    async createIkco(@Body(new ValidationPipe()) createIkcoDto: CreateIkcoDto, ): Promise<Ikco> {
        return this.ikcoService.createIkco(createIkcoDto);
    }

    @Patch('update')
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        description: 'Update Images Ikco',
        schema: {
            type: 'object',
            properties: {
                car_name : { type: 'string' },
                fieldName : { type: 'string' },
                title : { type: 'string' },
                description : { type: 'string' },
                files : { 
                    type: 'array', items: { type: "string", format: "binary" }, 
                    description: 'لطفا در بارگذازی فایل ها از ارسال فایل با نام فارسی خودداری بفرمایید'
                },
            },
        },
    })
    @UseInterceptors(FilesInterceptor('files', 20, multerConfig))
    async updateFiles(
        @Body() updateIkcoDto: CreateContentDto,
        @UploadedFiles() files
    ) {        
        return this.ikcoService.createContent(updateIkcoDto, files);        
    }
}