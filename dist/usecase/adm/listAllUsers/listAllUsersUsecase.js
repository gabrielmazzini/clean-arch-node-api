"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUsersUsecase = void 0;
/**
 */
class GetAllUsersUsecase {
    adminRepository;
    /**
       * @param {IAdminRepository} adminRepository
       */
    constructor(adminRepository) {
        this.adminRepository = adminRepository;
    }
    /**
     * @param {IAdminRepository} adminRepository
     * @return {GetAllUsersUsecase}
     */
    static create(adminRepository) {
        return new GetAllUsersUsecase(adminRepository);
    }
    /**
     */
    async execute() {
        try {
            const users = (await this.adminRepository.listAllUsers());
            if (users === null || users.length === 0) {
                return [];
            }
            const output = this.presenter(users);
            return output;
        }
        catch (error) {
            throw new Error("Server error: " + error);
        }
    }
    /**
     * @param {User} users
     * @return {GetAllUsersOutputDto}
     */
    presenter(users) {
        const output = users.map(user => {
            return {
                id: user.id,
                name: user.name,
                lastName: user.lastName,
                birthdate: user.birthdate.format(),
                cpf: user.cpf.value(),
                email: user.email.value(),
                address: user.address,
                typeUser: user.typeUser
            };
        });
        return output;
    }
}
exports.GetAllUsersUsecase = GetAllUsersUsecase;
