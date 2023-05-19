import { Module } from '@nestjs/common';
import { ModiranCarService } from './modiran_car.service';
import { ModiranCarController } from './modiran_car.controller';

@Module({
  providers: [ModiranCarService],
  controllers: [ModiranCarController]
})
export class ModiranCarModule {}
