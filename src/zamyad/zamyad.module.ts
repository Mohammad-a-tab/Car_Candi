import { Module } from '@nestjs/common';
import { ZamyadController } from './zamyad.controller';

@Module({
  controllers: [ZamyadController]
})
export class ZamyadModule {}
