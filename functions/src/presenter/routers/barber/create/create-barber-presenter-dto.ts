export interface IcreateBarberPresenterInputDto {
  name: string;
  lastName: string;
  email: string;
  phone: number;
  featuredImage: string;
  portfolio: string[];
  address: string;
  reviews?: number[];
  typeOfService: string[];
  transationsId?: string[];
  barbershopId: string;
  openingHours: string[];
  socialMedia?: string[];
  typeUser: string;
}

export interface IcreateBarberPresenterOutputDto {
  id: string;
}
