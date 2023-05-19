import { Module } from '@nestjs/common';
import { KiaService } from './kia.service';
import { KiaController } from './kia.controller';

@Module({
  providers: [KiaService],
  controllers: [KiaController]
})
export class KiaModule {}
