import { Module } from '@nestjs/common';
import { RamackCarService } from './ramack_car.service';
import { RamackCarController } from './ramack_car.controller';

@Module({
  providers: [RamackCarService],
  controllers: [RamackCarController]
})
export class RamackCarModule {}
