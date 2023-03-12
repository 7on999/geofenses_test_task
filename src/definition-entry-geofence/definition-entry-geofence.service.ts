import { Injectable } from '@nestjs/common';
import {DefineEntryService} from './definition-entry-geofence.interface'

@Injectable()
export class DefinitionEntryGeofenceService {
  constructor(){}

  async defineEntry(data:DefineEntryService): Promise<boolean> {
    const {coordinates, latitude, longitude} = data

    if (coordinates.some(([lat, long])=>lat===latitude && long===longitude)) return true //1 особый случай - точка в вершине многоугольника

    for (let i=0; i<coordinates.length-1; i++){ //2 особый случай - точка принадлежит одному из образующих прямоугольник отрезков
      const segmentLength = 
        Math.sqrt((coordinates[i+1][0]-coordinates[i][0])**2 + (coordinates[i+1][1]-coordinates[i][1])**2)
          
      const distanceBetweenCoordinateAndFirstSegmentEnd = 
        Math.sqrt(((coordinates[i+1][0]-latitude)**2 + (coordinates[i+1][1]-longitude)**2))
           
      const distanceBetweenCoordinateAndSecondSegmentEnd = 
        Math.sqrt((coordinates[i][0]-latitude)**2 + (coordinates[i][1]-longitude)**2)

      if (segmentLength===distanceBetweenCoordinateAndFirstSegmentEnd+distanceBetweenCoordinateAndSecondSegmentEnd){
        return true   
      }
    }

    let j = coordinates.length-1
    let result = false

    for (let i=0; i<coordinates.length; i++ ){
      if ((coordinates[i][1] < longitude && coordinates[j][1] >= longitude || coordinates[j][1]<longitude && coordinates[i][1] >= longitude)  &&
       (coordinates[i][0] + (longitude - coordinates[i][1]) / (coordinates[j][1] - coordinates[i][1]) * (coordinates[j][0] - coordinates[i][0]) < latitude) ) {
        result = !result;
       }
       j = i;
    }
    return result
  }
}
