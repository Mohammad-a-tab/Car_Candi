import { Module } from '@nestjs/common';
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
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/Car-Candi'),
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
    ZamyadModule, AuthModule, UsersModule
  ],
})
export class AppModule {}
