import { Module } from '@nestjs/common';
import { HyundaService } from './hyunda.service';

@Module({
  providers: [HyundaService]
})
export class HyundaModule {}
