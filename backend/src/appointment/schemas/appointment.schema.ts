import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AppointmentDocument = Appointment & Document;

@Schema()
export class Appointment {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  vetName: string;

  @Prop({ required: true })
  vetEmail: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  timeAndDate: string;

  
  @Prop({   default:false})
  status: boolean;
 
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
