import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Content, ContentSchema } from './content.model';

@Schema({ timestamps: true, versionKey: false })
export class Ikco extends Document {
  @Prop({ required: true })
  car_name: string;

  @Prop({ type: [ContentSchema], default: [] })
  Mechanicals: Content[];

  @Prop({ type: [ContentSchema], default: [] })
  Injector: Content[];

  @Prop({ type: [ContentSchema], default: [] })
  Air_bag: Content[];

  @Prop({ type: [ContentSchema], default: [] })
  Wiring: Content[];

  @Prop({ type: [ContentSchema], default: [] })
  Engine: Content[];
}``
export const IkcoSchema = SchemaFactory.createForClass(Ikco);
