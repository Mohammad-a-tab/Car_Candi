import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Content } from 'src/public/public.model';

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
