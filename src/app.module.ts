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
import { BahmanService } from './bahman/bahman.service';
import { BahmanController } from './bahman/bahman.controller';
import { BahmanModule } from './bahman/bahman.module';
import { HyundaController } from './hyunda/hyunda.controller';
import { HyundaModule } from './hyunda/hyunda.module';

@Module({
  imports: [IkcoModule, KiaModule, MazdaModule, SaipaModule, BahmanModule, HyundaModule],
  controllers: [AppController, IkcoController, MazdaController, BahmanController, HyundaController],
  providers: [AppService, IkcoService, MazdaService, BahmanService],
})
export class AppModule {}
