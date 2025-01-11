export interface IUpdatePlantInputDto {
  id: string;
  scientificName: string;
  popularName: string;
  species: string;
  image: string;
  createdAt: string;
}

export interface updatePlantOutputDto {
  message: string;
  status: boolean;
}
