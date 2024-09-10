/* eslint-disable max-len */
import {ApiExpress} from "./infra/api/express/api-express";
import {CreateUserRoute} from "./presenter/routers/user/create-user-express-router";
import {UserRepositoryFirebase} from "./infra/repositories/firebase/user-repository-firebase";
import {FirestoreFirebase} from "./package/firebase/firebase-firestore";
import {CreateUserUseCase} from "./usecase/user/create-user/create-user-usecase";
// import {GetUserUsecase} from "./usecases/user/get-user/getUserUsecase";
// import {GetUserRoute} from "./presenter/routes/user/get.user.express.router";
// import {UpdateUserUsecase} from "./usecases/user/update-user/updateUserUsecase";
// import {UpdateUserRoute} from "./presenter/routes/user/update.user.express.router";
// import {DeleteUserUsecase} from "./usecases/user/delete-user/deleteUserUsecase";
// import {DeleteUserRoute} from "./presenter/routes/user/delete.user.express.router";
// import {GetAllUsersUsecase} from "./usecases/admin/getAllUsers/get.all.users.usecase";
// import {AdminRespositoryFirebase} from "./infra/repositories/admin/admin.repository.firebase";
// import {GetAllUsersRoute} from "./presenter/routes/admin/get.all.users.express.router";


// create user
const userRepositoryFirebase = UserRepositoryFirebase.create(FirestoreFirebase);
const createUserUseCase = CreateUserUseCase.create(userRepositoryFirebase);
const createRoute = CreateUserRoute.create(createUserUseCase);

// get user
// const getUserUsecase = GetUserUsecase.create(userRepositoryFirebase);
// const getUseRoute = GetUserRoute.create(getUserUsecase);

// update user
// const updateUserUseCase = UpdateUserUsecase.create(userRepositoryFirebase);
// const updateRoute = UpdateUserRoute.create(updateUserUseCase);

// delete user
// const deleteUserUsecase = DeleteUserUsecase.create(userRepositoryFirebase);
// const deleteRoute = DeleteUserRoute.create(deleteUserUsecase);

// Admin area
// get all users => admin
// const adminRespositoryFirebase = AdminRespositoryFirebase.create(FirestoreFirebase);
// const getAllUsersUsecase = GetAllUsersUsecase.create(adminRespositoryFirebase);
// const getAllUsersRoute = GetAllUsersRoute.create(getAllUsersUsecase);

// create new romm => admin
// const createRoomUsecase = CreateRoomUsecase.create(adminRespositoryFirebase);
// const createRoomRoute = CreateRoomRoute.create(createRoomUsecase);

// get all roons => admin
// const getAllRoonsUsecase = GetAllRoonsUsecase.create(adminRespositoryFirebase);
// const getAllRoonsRoute = GetAllRoonsRoute.create(getAllRoonsUsecase);

// start aplication
const api = ApiExpress.create([
  createRoute,
]);
api.start();



