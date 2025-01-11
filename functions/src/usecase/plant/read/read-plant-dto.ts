export interface IReadPlantInputDto {
  id: string;
}

export interface IReadPlantOutputDto {
  id: string;
  scientificName: string;
  popularName: string;
  species: string;
  image: string;
}
