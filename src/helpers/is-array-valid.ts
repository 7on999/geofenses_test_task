export function isValidArrCoordinates(generalArr:unknown):boolean {

  if (!Array.isArray(generalArr)) return false
  if (generalArr.length<3) return false
  
  for (let innerArray of generalArr){
    if (!Array.isArray(innerArray)) return false
    if (innerArray.length!==2) return false

    for (let i=0; i<innerArray.length; i++){
      if (typeof innerArray[i] !== 'number') return false
      if (i===0 && (innerArray[i]>90||innerArray[i]<-90)) return false
      if (i===1 && (innerArray[i]>180||innerArray[i]<-180)) return false
    }
  }

  return true
}

export const conditionalValidArrayText = 'The valid type for property coordinate must be a Array<[number, number]>. First element of inner array - latitude - should be in range (-90;90). Second element - longitude - should be in range (-180;180)`'
