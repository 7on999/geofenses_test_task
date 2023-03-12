import { Controller, Get, Post, Delete, Body, Param, Patch, UsePipes, ValidationPipe, Res, HttpStatus } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Response } from 'express';

import { GeofenceService } from './geofence.service';
import { CreateGeofenceDto, UpdateGeofenceDto, DeleteRefenceResponse } from '../dto/create-geofence.dto';
import { Geofence } from '../models/geofence.model'

import { notFoundGeofence } from '../helpers/not-foun-geofence'
import {somethingWentWrong} from '../helpers/something-went-wrong'
import {isValidArrCoordinates, conditionalValidArrayText} from '../helpers/is-array-valid'

import type { GetGeofence, ReponseError, deleteGeofence, ServerResponse, MessageErrorText } from './geofence.interface'
import  { KindsGeofences } from './geofence.interface'

const isMessageError = (data:MessageErrorText|ServerResponse<CreateGeofenceDto>):data is MessageErrorText => {
  return 'messageError' in data
}

@ApiTags('Геозоны')
@Controller('geofences')
export class GeofenceController {
  constructor(private readonly geofenceService: GeofenceService) {}

  @ApiOperation({summary:'Получение списка всех геозон'})
  @ApiResponse({status:200, type:[Geofence]})
  @Get()
  async gelAll(@Res() res:Response): Promise<Response<Array<ServerResponse<Geofence>>|ReponseError>> {
    const response = await this.geofenceService.gelAll();
    if (!response) return somethingWentWrong(res)

    return res.status(HttpStatus.FOUND).json(response)
  }

  @ApiOperation({summary:'Получение геозоны по id'})
  @ApiResponse({ type: Geofence})
  @Get(':id')
  async getOneById(@Param('id') id:string, @Res() res: Response): Promise<Response<GetGeofence|ReponseError>> {
    const response = await this.geofenceService.getOneById(id);

    if(!response) return notFoundGeofence(res, id)

    return res.status(HttpStatus.FOUND).json(response)
  }

  @ApiOperation({summary:'Создание геозоны'})
  @ApiBody({type: CreateGeofenceDto })
  @ApiResponse({type: Geofence})
  @Post()
  @UsePipes(ValidationPipe)
  async createGeofence(@Body() dto: CreateGeofenceDto, @Res() res:Response): Promise<Response<ServerResponse<CreateGeofenceDto>|ReponseError>> {
    const response = await this.geofenceService.createGeofence(dto);

    if (isMessageError(response)) return somethingWentWrong(res, response.messageError)

    return res.status(HttpStatus.CREATED).json(response)

  }

  @ApiOperation({summary:'Обновление геозоны'})
  @ApiBody({type: UpdateGeofenceDto})
  @ApiResponse({type: Geofence})
  @Patch(':id')
  async update (
    @Body() dto: Partial<CreateGeofenceDto>,
    @Param('id') id:string,
    @Res() res: Response
    ): Promise<Response<ServerResponse<CreateGeofenceDto>|ReponseError>> {

      if('name' in dto){
        const isUnique =  await this.geofenceService.checkNameUnique(dto.name, Number(id))
        if (!isUnique) return somethingWentWrong(res, `Геозона с именем ${dto.name} уже существует`)
      }

      if ('coordinates' in dto){
        const isValid =  isValidArrCoordinates(dto.coordinates)
        if (!isValid) return somethingWentWrong(res, conditionalValidArrayText)
      }

      if ('kind' in dto && !Object.values(KindsGeofences).includes(dto.kind)){
        return somethingWentWrong(res, 'Не валидное значение поля kind')
      }

      const response =  await this.geofenceService.update(dto, id)

      if (!response) return notFoundGeofence(res, id)
      if (isMessageError(response)) return somethingWentWrong(res, response.messageError)

      return res.status(HttpStatus.GONE).json(response)
  }

  @ApiOperation({summary:'Удаление геозоны'})
  @ApiResponse( {type:DeleteRefenceResponse} )
  @Delete(':id')
  async delete(@Param('id') id:string, @Res() res:Response):Promise<Response<deleteGeofence|ReponseError>>{ 

    const response = await this.geofenceService.delete(id)
    if(!response) return notFoundGeofence(res, id)

    return res.json({ success: true })
  }
}
