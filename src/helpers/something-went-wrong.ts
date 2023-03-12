import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import type {ReponseError} from '../geofence/geofence.interface'

export const somethingWentWrong = (res:Response, error?:any):Response<ReponseError>=>{
  return res.status(HttpStatus.BAD_REQUEST).json({success:false, message: `Что-то пошло не так. Повторите попытку позже или свяжитесь с администратором`, error})
}