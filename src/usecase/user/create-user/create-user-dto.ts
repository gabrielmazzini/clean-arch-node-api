export interface CreateUserInputDto {
    name: string;
    lastName: string;
    dataNasc: string;
    cpf: number;
    email: string;
    address: {
      street: string;
      numberHome: string;
      district: string;
      complement?: string;
      state: string;
      city: string;
      country: string;
    }
}

export interface CreateUserOutputDto {
    id: string;
}
