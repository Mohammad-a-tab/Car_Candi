import { Body, Controller, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { IkcoService } from './ikco.service';
import { Ikco } from './ikco.model';
import { CreateIkcoDto } from './dto/create-ikco.dto';
import { IkcoIdDto } from './dto/id-ikco.dto';

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
}