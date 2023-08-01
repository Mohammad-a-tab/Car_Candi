import { Body, Controller, Get, Param, Patch, Post, UploadedFiles, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { IkcoService } from './ikco.service';
import { Ikco } from './ikco.model';
import { CreateIkcoDto } from './dto/create-ikco.dto';
import { IkcoIdDto } from './dto/id-ikco.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UpdateIkcoDto } from './dto/update-ikco.dto';
import { multerConfig } from 'src/utils/multer.config';

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
     * Create a new Ikco car.
     * @param createIkcoDto The data to create the Ikco car.
     */
    @Post()
    @ApiConsumes('application/x-www-form-urlencoded')
    @ApiBody({ type: CreateIkcoDto, description: 'Data to create a new Ikco car' })
    async createIkco(@Body() createIkcoDto: CreateIkcoDto): Promise<Ikco> {
        return this.ikcoService.createIkco(createIkcoDto);
    }

    /**
     * Update an Ikco car, including images or videos or pdfs.
     * @param updateIkcoDto The data to update the Ikco car.
     * @param files The uploaded images, videos, pdfs for the Ikco car.
     */
    @Patch()
    @ApiConsumes('multipart/form-data')
    @ApiBody({ type: UpdateIkcoDto, description: 'Data to update an existing Ikco car' })
    @UseInterceptors(FilesInterceptor('files', 20, multerConfig))
    async updateIkco(
        @Body() updateIkcoDto: UpdateIkcoDto,
        @UploadedFiles() files,
    ): Promise<any> {
        return this.ikcoService.updateIkco(updateIkcoDto, files);
    }
}