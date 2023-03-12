import { ApiProperty } from '@nestjs/swagger';

import { Column, Model, Table, DataType, AllowNull } from 'sequelize-typescript';

import {GeofenceCreationAttrs, KindsGeofences} from '../geofence/geofence.interface'
import {CoordinatesTuplesArray} from '../geofence/geofence.interface'

@Table
export class Geofence extends Model<Geofence, GeofenceCreationAttrs> {
  @ApiProperty({example:1, description:'Уникальный идентификатор'})
  @Column({type:DataType.INTEGER, unique:true, autoIncrement:true, primaryKey: true})
  id: number;

  @ApiProperty({example:"Район для вывоза мусора", description: "Название геозоны"})
  @Column({type:DataType.STRING, unique:true, allowNull:false})
  name:string;

  @ApiProperty({example:"polygon", description:"Вид геозоны. ( Сейчас только полигон)"})
  @Column({type:DataType.STRING})
  kind: KindsGeofences.Polygon

  @ApiProperty({example: [  [  20, 20 ], [ 30, 20 ], [ 30, 30 ], [ 20, 30 ] ], description: "Координаты точек, образующих геозону. Каждая координата - массив из двух элементов - широты и долготы. Южная широта и западная долгота будут отрицательными, а северная широта и восточная долгота - положительными. Диапозон широт (-90;90). Диапозон долготы (-180;180)."})
  @Column({type:DataType.ARRAY(DataType.ARRAY(DataType.INTEGER))})
  coordinates: CoordinatesTuplesArray

}