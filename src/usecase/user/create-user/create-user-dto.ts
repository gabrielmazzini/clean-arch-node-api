export interface CreateUserInputDto {
    name: string;
    email: string;
    password: string;
}

export interface CreateUserOutputDto {
    id: string;
}
