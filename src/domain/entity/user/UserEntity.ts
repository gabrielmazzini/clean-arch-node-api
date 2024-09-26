export interface User {
  id: string;
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
    city: string;
    state: string;
    country: string;
  }
}