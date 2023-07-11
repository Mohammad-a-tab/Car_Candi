import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class Content extends Document {
  @Prop({ required: true })
  Videos_Section: video[];

  @Prop({ required: true })
  Images_Section: image[];

  @Prop({ required: true })
  PDFs_section: pdf[];
  
}
@Schema({ versionKey: false })
export class video extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  video: string;
  
}
@Schema({ versionKey: false })
export class image extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  images: string[];
  
}
@Schema({ versionKey: false })
export class pdf extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  PDFs: string[];
  
}

