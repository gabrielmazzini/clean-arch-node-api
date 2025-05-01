/* eslint-disable @typescript-eslint/no-empty-interface */
export interface ReadAllBarbersOutputDto {
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

export interface ReadAllBarbersInputDto {}
