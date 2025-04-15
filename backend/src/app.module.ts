import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { VetModule } from './vet/vets.module';
import { UserModule } from './user/user.module';
import { ImageModulee } from './image/image.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppointmentModule } from './appointment/appointment.module';
import { LocationModule } from './location/location.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'), // Path to your static files
      serveRoot: '/uploads',  // Base URL for serving the static fil
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/fypcollection'),
    VetModule,
    UserModule,
    ImageModulee,
    AppointmentModule,
    LocationModule
  ],
})
export class AppModule {}
