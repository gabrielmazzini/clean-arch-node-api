/* eslint-disable @typescript-eslint/no-explicit-any */
// src/domain/mapper/UserMapper.ts
import {Plant} from "../entity/plant/plantEntity";
/**
 */
export class PlantMapper {
  /**
   * @param {any} data
   * @return {Plant}
   */
  static toEntity(data: any): Plant {
    return Plant.with({
      id: data._id,
      scientificName: data._scientificName,
      popularName: data._popularName,
      species: data._species,
      image: data._image,
    });
  }
  /**
   * @param {Plant} plant
   * @return {object}
   */
  static toDto(plant: Plant) {
    return {
      id: plant.id,
      scientificName: plant.scientificName,
      popularName: plant.popularName,
      species: plant.species,
      image: plant.image,
    };
  }
  /**
   * @param {object} input
   * @return {object}
   */
  static toObject(input: object) {
    const updatedObject: Record<string, any> = {};
    for (const [key, value] of Object.entries(input)) {
      if (value === undefined || key === "_id") continue;
      updatedObject[`_${key}`] = value;
    }
    return updatedObject;
  }
}
