export interface IUpdateBarberPresenterInputDto {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: number;
  featuredImage: string;
  portfolio: string[];
  address: string;
  reviews: number[];
  typeOfService: string[];
  transationsId: string[];
  barbershopId: string;
  openingHours: string[];
  socialMedia: string[];
  typeUser: string;
}

export interface updateBarberPresenterOutputDto {
  status: boolean;
}
