import { ApiProperty } from "@nestjs/swagger"

import {
  IsNotEmpty,
  Max,
  Min,
  IsNumber
} from 'class-validator';


export class DefinitionEntryDto {

  @ApiProperty({example: 56, description: "Значение широты"})
  @IsNotEmpty()
  @IsNumber()
  @Max(90)
  @Min(-90)
  readonly latitude: number;

  @ApiProperty({example: 37, description: "Значение долготы"})
  @IsNotEmpty()
  @IsNumber()
  @Max(180)
  @Min(-180)
  readonly longitude: number;

  @ApiProperty({example: 1, description: "Id геозоны, к принадлежности точки которой происходит проверка"})
  @IsNotEmpty()
  @IsNumber()
  readonly geofence_id: number;
}

export class ResponseEntry {
  @ApiProperty({example: true, description: "Ответ входит ли точка в указанную геозону"})
  is_entry:boolean
}
