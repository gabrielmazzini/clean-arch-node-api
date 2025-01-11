/* eslint-disable @typescript-eslint/no-empty-interface */
export interface GetAllUsersOutputDto {
  id: string;
  name: string;
  lastName: string;
  birthdate: string;
  cpf: string;
  email: string;
  address: {
    street: string;
    complement?: string;
    numberHome: string;
    district: string;
    state: string;
    city: string;
    country: string;
  };
  typeUser: string;
}

export interface GetAllUsersInputDto {}
