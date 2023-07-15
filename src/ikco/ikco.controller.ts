import { Body, Controller, Get, Param, Patch, Post, Query, UploadedFiles, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiQuery, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { IkcoService } from './ikco.service';
import { Ikco } from './ikco.model';
import { CreateIkcoDto } from './dto/create-ikco.dto';
import { IkcoIdDto } from './dto/id-ikco.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UpdateIkcoDto } from './dto/update-ikco.dto';
import { editPaths } from '../utils/functions.js';
import { multerConfigForImages, multerConfigForPDFs, multerConfigForVideos } from 'src/utils/multer.config';

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
    // @ApiParam({
    //     name: 'car_name',
    //     type: 'string',
    //     description: 'car_name of the Ikco',
    // })
    // @ApiQuery({ name: 'fieldName', type: 'string' })
    @ApiBody({
        description: 'Update Images Ikco',
        schema: {
            type: 'object',
            properties: {
                title : { type: 'string' },
                description : { type: 'string' },
                images : { 
                    type: 'array', items: { type: "string", format: "binary" }, 
                },
                // videos : { 
                //     type: 'array', items: { type: "string", format: "binary" }, 
                // },
                // PDFs : { 
                //     type: 'array', items: { type: "string", format: "binary" }, 
                // },
            },
        },
    })
    @UseInterceptors(
        FilesInterceptor('images', 10, multerConfigForImages),
        // FilesInterceptor('videos', 3, multerConfigForVideos),
        // FilesInterceptor('PDFs', 5, multerConfigForPDFs),
        )
    async insertImageIkco(
        @Body(new ValidationPipe()) updateIkcoDto: UpdateIkcoDto,
        // @Param() car_name: string,
        // @Query() fieldName: string,
        @UploadedFiles() imageFiles, 
        // @UploadedFiles() videoFiles, 
        // @UploadedFiles() PDFsFiles, 
    ): Promise<object> {
        editPaths(imageFiles, updateIkcoDto);
        // editPaths(videoFiles, updateIkcoDto);
        // editPaths(PDFsFiles, updateIkcoDto);
        return this.ikcoService.updateIkco(updateIkcoDto, "سمند", "مکانیکی");
    }
}