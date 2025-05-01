export interface GetUserOutputDto {
    id: string;
    name: string;
    lastName: string;
    phone: number;
    birthdate: string;
    cpf: string;
    email: string;
    creditCard: {
      cardNumber: string;
      cvv: number;
      expirationDate: string;
      holderName: string;
      holderCpf: string;
    };
    transationId?: string[];
    featuredImage: string;
    geoLocation?: {
    latitude: string;
    longitude: string;
    };
    typeUser: string;
    createdAt: Date;
}

export interface GetUserInputDto {
  id: string;
}
