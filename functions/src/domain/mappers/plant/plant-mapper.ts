/* eslint-disable @typescript-eslint/no-explicit-any */
// src/domain/mapper/UserMapper.ts
import {Plant} from "../../entity/plant/plantEntity";
/**
 */
export class PlantMapper {
  /**
   * @param {any} data
   * @return {Plant}
   */
  static toEntity(data: any): Plant {
    return Plant.with({
      id: data.id,
      scientificName: data.scientificName,
      popularName: data.popularName,
      species: data.species,
      image: data.image,
    });
  }
  /**
   * @param {Plant} plant
   * @return {object}
   */
  static toDto(plant: Plant) {
    return {
      id: plant._id,
      scientificName: plant._scientificName,
      popularName: plant._popularName,
      species: plant._species,
      image: plant._image,
    };
  }
  /**
   * @param {object} input
   * @return {object}
   */
  static toObject(input: object) {
    const updatedObject: Record<string, any> = {};
    for (const [key, value] of Object.entries(input)) {
      if (value === undefined || key === "id") continue;
      updatedObject[`${key}`] = value;
    }
    return updatedObject;
  }
}
