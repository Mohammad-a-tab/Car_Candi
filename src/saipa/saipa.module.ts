import { Module } from '@nestjs/common';
import { SaipaController } from './saipa.controller';
import { SaipaService } from './saipa.service';

@Module({
  controllers: [SaipaController],
  providers: [SaipaService]
})
export class SaipaModule {}
