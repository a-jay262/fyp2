import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppointmentService } from './appointment.service';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async bookAppointment(@Body() body: {
    name: string;
    email: string;
    vetName: string;
    vetEmail: string;
    location: string;
    timeAndDate: string;
  }) {
    const appointment = await this.appointmentService.createAppointment(body);
    return {
      message: 'Appointment booked successfully!',
      appointment,
    };
  }

  @Get()
  async getAll() {
    return this.appointmentService.getAllAppointments();
  }
  @Get('vet')
  async getAppointmentsForVet(
    @Query('vetEmail') vetEmail: string,
  ) {
    return this.appointmentService.findByVet( vetEmail);
  }
  @Post('send-notification') 
  async sendNotification(@Body('email') email: string, @Body('name') name: string, @Body('message') message :string) {
    try {
      await this.appointmentService.sendNotificationEmail(email, name,message);
  
      return {
        success: true,
        message: 'Notification email sent successfully',
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to send notification email',
        error: error.message,
      };
    }
  }
}
