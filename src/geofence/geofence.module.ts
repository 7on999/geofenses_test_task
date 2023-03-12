import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { GeofenceController } from './geofence.controller';
import { GeofenceService } from './geofence.service';
import {Geofence} from '../models/geofence.model'

@Module({
  imports: [
    SequelizeModule.forFeature([Geofence])
  ],
  controllers: [GeofenceController],
  providers: [GeofenceService],
})
export class GeofenceModule {}

