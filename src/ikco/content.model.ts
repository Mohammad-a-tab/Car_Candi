import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
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
  pdfs: string[];
}
export const ContentSchema = SchemaFactory.createForClass(Content);
