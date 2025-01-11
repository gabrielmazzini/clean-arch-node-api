export interface IUpdatePlantPresenterInputDto {
  id: string;
  scientificName: string;
  popularName: string;
  species: string;
  image: string;
  createdAt: string;
}

export interface updatePlantPresenterOutputDto {
  message: string;
  status: boolean;
}
