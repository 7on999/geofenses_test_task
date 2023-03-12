import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/sequelize"

import { CreateGeofenceDto } from '../dto/create-geofence.dto';
import { Geofence } from '../models/geofence.model'

import type { ServerResponse, MessageErrorText } from './geofence.interface'


@Injectable()
export class GeofenceService {
  constructor(@InjectModel(Geofence) private geofenceRepository: typeof Geofence){}

 public async gelAll(): Promise<Array<ServerResponse<Geofence>>|null> {
    try {
      return await this.geofenceRepository.findAll({})
    } catch(e){
      return null
    }
  }

  public async getOneById(id:string): Promise<ServerResponse<Geofence>|null> {
    try{
      return await this.geofenceRepository.findByPk(id)
    } catch(e) {
     return null
    }
  }

  public async createGeofence(dto: CreateGeofenceDto):Promise<ServerResponse<CreateGeofenceDto>|MessageErrorText>{
    try {
      return await this.geofenceRepository.create(dto)
    } catch(e){
      return {
        messageError: e?.errors[0]?.message
      }
    }
  }

  public async update(data: Partial<CreateGeofenceDto>, id:string):Promise<ServerResponse<Geofence>|null|MessageErrorText> {
    try {
      const geofence = await this.geofenceRepository.findByPk(id)
      if (!geofence) return null

      geofence.update(data)
      geofence.save

      return geofence

    } catch(e){
      console.log('e in service:', e)
      return {
        messageError: e?.errors[0]?.message
      }
    }
  }

  public async delete(id:string):Promise<boolean>{
    return !!(await this.geofenceRepository.destroy({ where: { id } }))
  }

  public async checkNameUnique(name:string, id:number):Promise<boolean>{

    const geofence = await this.geofenceRepository.findOne({
      where: {name}
    })

    if (!geofence) return true

    return id===geofence.id
  }


  // if (!Array.isArray(generalArr)) return false
  // for (let innerArray of generalArr) {
  //   if (!Array.isArray(innerArray)) return false
   
    // for (let i=0; i<innerArray.length; i++){
    //   if (typeof innerArray[i] !== 'number') return false
    //   if (i===0 && (innerArray[i]>90||innerArray[i]<-90)) return false
    //   if (i===1 && (innerArray[i]>180||innerArray[i]<-180)) return false
    // }


  // public async isValidArrCoordinates(generalArr:unknown):Promise<boolean>{

  //   if (!Array.isArray(generalArr)) return false
  //   if (generalArr.length<3) return false
    
  //   for (let innerArray of generalArr){
  //     if (!Array.isArray(innerArray)) return false
  //     if (innerArray.length!==2) return false

  //     for (let i=0; i<innerArray.length; i++){
  //       if (typeof innerArray[i] !== 'number') return false
  //       if (i===0 && (innerArray[i]>90||innerArray[i]<-90)) return false
  //       if (i===1 && (innerArray[i]>180||innerArray[i]<-180)) return false
  //     }
  //   }

  //   return true
  // }
}
