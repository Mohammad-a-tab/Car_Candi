import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IkcoController } from './ikco/ikco.controller';
import { IkcoService } from './ikco/ikco.service';
import { IkcoModule } from './ikco/ikco.module';
import { KiaModule } from './kia/kia.module';
import { MazdaService } from './mazda/mazda.service';
import { MazdaController } from './mazda/mazda.controller';
import { MazdaModule } from './mazda/mazda.module';
import { SaipaModule } from './saipa/saipa.module';

@Module({
  imports: [IkcoModule, KiaModule, MazdaModule, SaipaModule],
  controllers: [AppController, IkcoController, MazdaController],
  providers: [AppService, IkcoService, MazdaService],
})
export class AppModule {}
