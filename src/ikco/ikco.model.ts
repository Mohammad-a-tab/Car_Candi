import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({ versionKey: false })
export class Content extends Document {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  videos: string[];

  @Prop()
  images: string[];

  @Prop()
  PDFs: string[];
}
@Schema({ timestamps: true, versionKey: false })
export class Ikco extends Document {
  @Prop({ required: true })
  car_name: string;

  @Prop()
  mechanical: Content;

  @Prop()
  Injector: Content;

  @Prop()
  Air_bag: Content;

  @Prop()
  Wiring: Content;

  @Prop()
  Engine: Content;
}

export const IkcoSchema = SchemaFactory.createForClass(Ikco);
