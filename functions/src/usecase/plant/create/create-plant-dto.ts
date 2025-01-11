export interface IcreatePlantInputDto {
  scientificName: string;
  popularName: string;
  species: string;
  image: string;
}
export interface IcreatePlantOutputDto {
  id: string;
  message: string;
}
