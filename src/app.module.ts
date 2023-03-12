import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
// import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger"

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
    // SequelizeModule.forFeature([Geofence])

    // SequelizeModule.forRoot({
    //   dialect: 'postgres',
    //   host: 'ep-still-forest-013336.eu-central-1.aws.neon.tech',
    //   username: '7on999',
    //   password: '2BPnoszXD6Rx',
    //   database: 'neondb?ssl=true',
    //   models: [Geoference ],
    //   autoLoadModels: true,
    //   ssl: false,
    // }),

  ],
  // controllers: [AppController],
  // providers: [AppService],
})
export class AppModule {}


// const x = 'postgres://7on999:2BPnoszXD6Rx@ep-still-forest-013336.eu-central-1.aws.neon.tech/neondb'
// const devConfig = `postgres://${process.env.USER_DB}:5385c4e52c4b8152545e525425377a91824e86354ed8f79ed224d7534624126d@${process.env.HOST_DB}:${process.env.PORT_DB}/${process.env.DATABASE_DB}`
// const elephant = `postgres://aqvkscaq:5ByPnfUD0blJbRlV58V1lyXRoM8jZm2p@mouse.db.elephantsql.com/aqvkscaq`

// const userDB_E  = 'aqvkscaq'
// const DATABASE_DB_E  = 'aqvkscaq'
// const password_DB_E = '5ByPnfUD0blJbRlV58V1lyXRoM8jZm2p'
// const HOST_DB_E  = 'mouse.db.elephantsql.com'


// TOKEN=5572980909:AAFJtVzL2PBTWhiUdLK0XWh7vVECBy9c-n8
// HOST_DB=ec2-52-208-164-5.eu-west-1.compute.amazonaws.com
// DATABASE_DB=de42h4drq4iqqa
// USER_DB=imgglzlqbqvzzj
// PORT_DB=5432
// PASSWORD_DB=5385c4e52c4b8152545e525425377a91824e86354ed8f79ed224d7534624126d