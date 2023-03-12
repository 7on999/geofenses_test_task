import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Res,
  HttpStatus
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Response } from 'express';

import { DefinitionEntryGeofenceService } from './definition-entry-geofence.service';
import { DefinitionEntryDto, ResponseEntry } from '../dto/entry-geofence.dto';
import {GeofenceService} from '../geofence/geofence.service'
import { notFoundGeofence } from '../helpers/not-foun-geofence'
import { somethingWentWrong } from '../helpers/something-went-wrong'

import type { ReponseError } from '../geofence/geofence.interface'
import type {DefineEntry} from './definition-entry-geofence.interface'

@ApiTags('Проверка принадлежности точки выбранной геозоне')
@Controller('entry')
export class DefinitionEntryGeofenceController {
  constructor (
    private readonly entryService: DefinitionEntryGeofenceService,
    private geofenceService:GeofenceService
  ) {}

  @Post()
  @ApiResponse({type:ResponseEntry})
  @UsePipes(ValidationPipe)
  async  defineEntry(@Body() dto: DefinitionEntryDto, @Res() res:Response): Promise<Response<ReponseError|DefineEntry>> {
    const {geofence_id, latitude, longitude} = dto

    try {
      const existGeofence = await this.geofenceService.getOneById(String(geofence_id))
      if (!existGeofence)  return notFoundGeofence(res, String(geofence_id))

      if ( typeof(existGeofence)!=='object') throw new Error
      const coordinates = existGeofence.coordinates
      
      const response = await this.entryService.defineEntry({latitude, longitude, coordinates});

      return res.status(HttpStatus.FOUND).json({is_entry: response})

    } catch(e){
        return somethingWentWrong(res)
    }
  }
}
