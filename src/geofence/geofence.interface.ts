interface GeneralFieldsServerResponse {
  id?:number
  createdAt?:  string
  updatedAt?: string
}

export type CoordinateTuple = [number, number]
export type CoordinatesTuplesArray = Array<CoordinateTuple>

//TODO: Add kind circle
export enum KindsGeofences {
  Polygon = "polygon"
}

export type ServerResponse<K> = GeneralFieldsServerResponse & K

export interface GeofenceCreationAttrs {
  name: string;
  kind: KindsGeofences.Polygon;
  coordinates: CoordinatesTuplesArray
}

export type GetGeofence = ServerResponse<GeofenceCreationAttrs>

export interface ReponseError{
  succes: boolean
  message:string
}

export interface deleteGeofence {
  success:boolean
}


export interface MessageErrorText {
  messageError:string
}







