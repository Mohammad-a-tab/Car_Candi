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
import { KermanMotorController } from './kerman_motor/kerman_motor.controller';
import { KermanMotorService } from './kerman_motor/kerman_motor.service';
import { KermanMotorModule } from './kerman_motor/kerman_motor.module';
import { ModiranCarModule } from './modiran_car/modiran_car.module';
import { ParsCarController } from './pars_car/pars_car.controller';
import { ParsCarService } from './pars_car/pars_car.service';
import { ParsCarModule } from './pars_car/pars_car.module';

@Module({
  imports: [IkcoModule, KiaModule, MazdaModule, SaipaModule, BahmanModule, HyundaModule, KermanMotorModule, ModiranCarModule, ParsCarModule],
  controllers: [AppController, IkcoController, MazdaController, BahmanController, HyundaController, KermanMotorController, ParsCarController],
  providers: [AppService, IkcoService, MazdaService, BahmanService, KermanMotorService, ParsCarService],
})
export class AppModule {}
