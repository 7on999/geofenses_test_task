import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import {Geofence} from './models/geofence.model'
import {GeofenceModule} from './geofence/geofence.module'
import {DefinitionEntryGeofenceModule} from './definition-entry-geofence/definition-entry-geofence.module'
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'mouse.db.elephantsql.com',
      username: 'aqvkscaq',
      password: '5ByPnfUD0blJbRlV58V1lyXRoM8jZm2p',
      database: 'aqvkscaq',
      models: [Geofence ],
      autoLoadModels: true,
      ssl: false
    }),
    GeofenceModule,
    DefinitionEntryGeofenceModule
  ],

})
export class AppModule {}
