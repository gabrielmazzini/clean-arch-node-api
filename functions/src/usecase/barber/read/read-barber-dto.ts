export interface IReadBarberInputDto {
  id: string;
}

export interface IReadBarberOutputDto {
  id: string;
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
  createdAt: Date;
  typeUser: string;
}
