import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Content } from "src/interface/content.interface";
import { Document } from 'mongoose';

@Schema()
export class Ikco extends Document {
  @Prop({ required: true })
  car_name: string;

  @Prop({ required: true })
  mechanical: Content;

  @Prop({ required: true })
  Injector: Content;

  @Prop({ required: true })
  Wiring: Content;

  @Prop({ required: true })
  Engine: Content;
  
}

export const IkcoSchema = SchemaFactory.createForClass(Ikco);
