/* eslint-disable max-len */
import {IPlantDto} from "./plant-dto";
import crypto = require("node:crypto");
/**
 */
export class Plant {
  private readonly _id: string;
  private readonly _scientificName: string;
  private readonly _popularName: string;
  private readonly _species: string;
  private readonly _image: string;
  /**
   * @param {string} id
   * @param {string} scientificName
   * @param {string} popularName
   * @param {string} species
   * @param {string} image
   */
  constructor({id, scientificName, popularName, species, image}: IPlantDto) {
    this._id = id;
    this._scientificName = scientificName;
    this._popularName = popularName;
    this._species = species;
    this._image = image;
  }
  /**
   * @param {string} scientificName
   * @param {string} popularName
   * @param {string} species
   * @param {string} image
   * @return {Plant}
   */
  public static create({
    scientificName,
    popularName,
    species,
    image,
  }: Omit<IPlantDto, "id">): Plant {
    return new Plant({
      id: crypto.randomUUID(),
      scientificName,
      popularName,
      species,
      image,
    });
  }
  /**
   * @param {string} id
   * @param {string} scientificName
   * @param {string} popularName
   * @param {string} species
   * @param {string} image
   * @param {string} createdAt
   * @return {Plant}
   */
  public static with({
    id,
    scientificName,
    popularName,
    species,
    image,
  }: IPlantDto): Plant {
    return new Plant({
      id,
      scientificName,
      popularName,
      species,
      image,
    });
  }
  /**
   * @param {string} id
   */
  public get id(): string {
    return this._id;
  }
  /**
   * @param {string} scientificName
   */
  public get scientificName(): string {
    return this._scientificName;
  }
  /**
   * @param {string} popularName
   */
  public get popularName(): string {
    return this._popularName;
  }
  /**
   * @param {string} species
   */
  public get species(): string {
    return this._species;
  }
  /**
   * @param {string} image
   */
  public get image(): string {
    return this._image;
  }
}
