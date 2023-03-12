import { ApiProperty } from "@nestjs/swagger"

import {
  IsNotEmpty,
  IsString,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  Validate,
  IsEnum,
  IsOptional
} from 'class-validator';


import { CoordinatesTuplesArray, KindsGeofences} from '../geofence/geofence.interface'
import { isValidArrCoordinates, conditionalValidArrayText} from '../helpers/is-array-valid'

@ValidatorConstraint()
export class ValidateTuplesArray implements ValidatorConstraintInterface {
  validate(generalArr: CoordinatesTuplesArray, args: ValidationArguments) {
    return isValidArrCoordinates(generalArr)
  }

  defaultMessage(args: ValidationArguments) {
    return conditionalValidArrayText
  }
}

export class CreateGeofenceDto {
  @ApiProperty({example:"Красивый район для прогулок", description: "Название геозоны"})
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({example: 'polygon', description: "Вид геозоны. В данный момент доступен только полигон"})
  @IsNotEmpty()
  @IsEnum(KindsGeofences)
  readonly kind!: KindsGeofences.Polygon;
   
  @ApiProperty({example: [  [  20, 20 ], [ 30, 20 ], [ 30, 30 ], [ 20, 30 ] ], description: "Координаты точек, образующих геозону. Каждая координата - массив из двух элементов - широты и долготы. Южная широта и западная долгота будут отрицательными, а северная широта и восточная долгота - положительными. Диапозон широт (-90;90). Диапозон долготы (-180;180)."})
  @Validate(ValidateTuplesArray)
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(3)
  @IsArray({
    each:true,
  })
  @ArrayMinSize(2, {
    each:true
  })
  @ArrayMaxSize(2, {
    each:true
  })
  readonly coordinates:CoordinatesTuplesArray
}


export class UpdateGeofenceDto {
  @ApiProperty({example:"Красивый район для прогулок", description: "Название геозоны", required: false})
  @IsString()
  @IsOptional()
  readonly name: string;

  @ApiProperty({example: 'polygon', description: "Вид геозоны. В данный момент доступен только полигон", required: false})
  @IsOptional()
  @IsEnum(KindsGeofences)
  readonly kind!: KindsGeofences.Polygon;
   
  @ApiProperty({
    example: [  [  20, 20 ], [ 30, 20 ], [ 30, 30 ], [ 20, 30 ] ], 
    description: "Координаты точек, образующих геозону. Каждая координата - массив из двух элементов - широты и долготы. Южная широта и западная долгота будут отрицательными, а северная широта и восточная долгота - положительными. Диапозон широт (-90;90). Диапозон долготы (-180;180).",
    required: false
  })
  @IsOptional()
  @Validate(ValidateTuplesArray)
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(3)
  @IsArray({
    each:true,
  })
  @ArrayMinSize(2, {
    each:true
  })
  @ArrayMaxSize(2, {
    each:true
  })
  readonly coordinates:CoordinatesTuplesArray
}

export class DeleteRefenceResponse {
  @ApiProperty({example: true, description: "Cтатус удаления геозоны"})
  success:boolean
}
