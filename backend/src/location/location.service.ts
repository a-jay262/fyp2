import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Location, LocationDocument } from './location.schema';
import { Model } from 'mongoose';

@Injectable()
export class LocationService {
  constructor(@InjectModel(Location.name) private locModel: Model<LocationDocument>) {}

  async saveLocation(latitude: number, longitude: number) {
    const location = new this.locModel({ latitude, longitude });
    return location.save();
  }

  async getAllLocations() {
    return this.locModel.find().sort({ date: -1 });
  }
}
