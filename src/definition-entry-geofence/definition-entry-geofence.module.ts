import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DefinitionEntryGeofenceController } from './definition-entry-geofence.controller';
import { DefinitionEntryGeofenceService } from './definition-entry-geofence.service';
import { Geofence } from '../models/geofence.model';
import { GeofenceService } from '../geofence/geofence.service';

@Module({
  imports: [SequelizeModule.forFeature([Geofence])],
  controllers: [DefinitionEntryGeofenceController],
  providers: [DefinitionEntryGeofenceService, GeofenceService],
})
export class DefinitionEntryGeofenceModule {}
