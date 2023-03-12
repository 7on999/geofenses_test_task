import {CoordinatesTuplesArray} from '../geofence/geofence.interface'

export interface DefineEntryService {
  latitude:number
  longitude:number
  coordinates: CoordinatesTuplesArray
}

export interface DefineEntry {
  is_entry:boolean
}