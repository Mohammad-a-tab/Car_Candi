import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Content } from 'src/public/public.model';

@Schema()
export class Ikco extends Document {
  @Prop({ required: true })
  car_name: string;

  @Prop()
  mechanical: Content;

  @Prop()
  Injector: Content;

  @Prop()
  Wiring: Content;

  @Prop()
  Engine: Content;
  
}

export const IkcoSchema = SchemaFactory.createForClass(Ikco);
