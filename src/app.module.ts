import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IkcoModule } from './ikco/ikco.module';
import { KiaModule } from './kia/kia.module';
import { MazdaModule } from './mazda/mazda.module';
import { SaipaModule } from './saipa/saipa.module';
import { BahmanModule } from './bahman/bahman.module';
import { HyundaModule } from './hyunda/hyunda.module';
import { KermanMotorModule } from './kerman_motor/kerman_motor.module';
import { ModiranCarModule } from './modiran_car/modiran_car.module';
import { ParsCarModule } from './pars_car/pars_car.module';
import { RamackCarModule } from './ramack_car/ramack_car.module';
import { ToyotaModule } from './toyota/toyota.module';
import { ZamyadModule } from './zamyad/zamyad.module';

@Module({
  imports: [
    IkcoModule, 
    KiaModule, 
    MazdaModule, 
    SaipaModule, 
    BahmanModule, 
    HyundaModule, 
    KermanMotorModule, 
    ModiranCarModule, 
    ParsCarModule, 
    RamackCarModule, 
    ToyotaModule, 
    ZamyadModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
