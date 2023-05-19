import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IkcoController } from './ikco/ikco.controller';
import { IkcoService } from './ikco/ikco.service';
import { IkcoModule } from './ikco/ikco.module';

@Module({
  imports: [IkcoModule],
  controllers: [AppController, IkcoController],
  providers: [AppService, IkcoService],
})
export class AppModule {}
