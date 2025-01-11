export interface IcreatePlantPresenterInputDto {
  scientificName: string;
  popularName: string;
  species: string;
  image: string;
}

export interface IcreatePlantPresenterOutputDto {
  id: string;
  message: string;
}
