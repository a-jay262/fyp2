import { Controller, Get, Post, Body } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('location')
export class LocationController {
  constructor(private readonly locService: LocationService) {}

  @Post()
  async addLocation(@Body() body: { latitude: number; longitude: number }) {
    return this.locService.saveLocation(body.latitude, body.longitude);
  }

  @Get()
  async getAll() {
    return this.locService.getAllLocations();
  }
}
