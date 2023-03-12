import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import type {ReponseError} from '../geofence/geofence.interface'

export const notFoundGeofence = (res:Response, geofenceId:string):Response<ReponseError> =>{
  return res.status(HttpStatus.NOT_FOUND).json({success:false, message: `Геозоны c id=${geofenceId}  не найдено`})
}
