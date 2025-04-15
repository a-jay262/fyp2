import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Appointment, AppointmentDocument } from './schemas/appointment.schema';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name) private appointmentModel: Model<AppointmentDocument>,
  ) {}

  async createAppointment(data: any): Promise<Appointment> {
    const newAppointment = new this.appointmentModel(data);
    return newAppointment.save();
  }

  async getAllAppointments(): Promise<Appointment[]> {
    return this.appointmentModel.find().exec();
  }
  async findByVet(vetEmail: string): Promise<Appointment[]> {
    return this.appointmentModel.find({ vetEmail }).exec();
  }
   async sendNotificationEmail(email: string, name: string, message:string) {
      console.log(nodemailer);
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,  // Access the email from the .env file
          pass: process.env.EMAIL_PASS,  // Access the password from the .env file
        },
      });
    
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Confirmation EmailAs a vet',
        text: `Notification for event Booking,
    
        Name: ${name}
        Email: ${email}
        Detail:${message}
    
        Thank you,
        The Vet Derm-X Team`,
      };
    
      await transporter.sendMail(mailOptions);
    }
}
