/* eslint-disable max-len */
import {IPlantDto} from "./plant-dto";
import crypto = require("node:crypto");
/**
 */
export class Plant {
  private readonly id: string;
  private readonly scientificName: string;
  private readonly popularName: string;
  private readonly species: string;
  private readonly image: string;
  /**
   * @param {string} id
   * @param {string} scientificName
   * @param {string} popularName
   * @param {string} species
   * @param {string} image
   */
  constructor({id, scientificName, popularName, species, image}: IPlantDto) {
    this.id = id;
    this.scientificName = scientificName;
    this.popularName = popularName;
    this.species = species;
    this.image = image;
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
  public get _id(): string {
    return this.id;
  }
  /**
   * @param {string} scientificName
   */
  public get _scientificName(): string {
    return this.scientificName;
  }
  /**
   * @param {string} popularName
   */
  public get _popularName(): string {
    return this.popularName;
  }
  /**
   * @param {string} species
   */
  public get _species(): string {
    return this.species;
  }
  /**
   * @param {string} image
   */
  public get _image(): string {
    return this.image;
  }
}
