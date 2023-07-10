import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Content extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  videos: string[];

  @Prop({ required: true })
  images: string[];

  @Prop({ required: true })
  PDFs: string;
  
}

