/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {firestore} from "firebase-admin";
import {IUserRepository} from "../../../domain/repositories/userRepositorie";
import { UserModel } from "../../database/models/user-model";
import {usersCollection} from "../../database/firebase/firebase-config";
import {User} from "../../../domain/entity/user/UserEntity";
/**
 */
export class UserRepositoryFirebase implements IUserRepository {
  /**
     * @param {firestore} firestoreProvider
     */
  private constructor(private readonly firestoreProvider: firestore.Firestore) {}
  /**
   * @param {firestore} firestoreProvider
   * @return {UserRepositoryFirebase}
   */
  public static create(firestoreProvider: firestore.Firestore) {
    return new UserRepositoryFirebase(firestoreProvider);
  }
  /**
     * @param {string} email
     * @return {object}
     */
  async fyndByEmail(email: string): Promise<object | null> {
    const usersRef = this.firestoreProvider.collection(usersCollection);
    const query = usersRef.where("email", "==", email);
    const userSnapshot = await query.get();
    if (userSnapshot.empty) return null;
    const user = userSnapshot.docs.map((doc) => ({
      id: doc.data().id,
      name: doc.data().name,
      lastName: doc.data().lastName,
      dataNasc: doc.data().dataNasc,
      cpf: doc.data().cpf,
      email: doc.data().email,
      address: {
        street: doc.data().address.street,
        numberHome: doc.data().address.numberHome,
        district: doc.data().address.district,
        state: doc.data().address.state,
        country: doc.data().address.country,
      }
    }));
    return user as object;
  }
  /**
     * @param {User} user
     */
  async save(user: UserModel): Promise<void> {
    const userData = {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      dataNasc: user.dataNasc,
      cpf: user.cpf,
      email: user.email,
      address: {
        street: user.address.street,
        numberHome: user.address.numberHome,
        district: user.address.district,
        state: user.address.state,
        country: user.address.country,
      }
    };
    await this.firestoreProvider.collection(usersCollection).doc(user.id).create(userData);
  }
  /**
   * @param {string} id
   */
  async getInfoUser(id: string): Promise<UserModel | null> {
    const userRef = this.firestoreProvider.collection(usersCollection).doc(id);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return null;
    }
    const user = {
      id: userDoc.data()!.id,
      name: userDoc.data()!.name,
      lastName: userDoc.data()!.lastName,
      dataNasc: userDoc.data()!.dataNasc,
      cpf: userDoc.data()!.cpf,
      email: userDoc.data()!.email,
      address: {
        street: userDoc.data()!.address.street,
        numberHome: userDoc.data()!.address.numberHome,
        district: userDoc.data()!.address.district,
        state: userDoc.data()!.address.state,
        country: userDoc.data()!.address.country,
      }
    };
    return UserModel.with(user);
  }
  /**
   * @param {string} id
   * @param {User} input
   */
  async updateUser(id: string, input: Omit<User, "id">): Promise<boolean | null> {
    const userRef = this.firestoreProvider.collection(usersCollection).doc(id);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return null;
    }
    const user: Omit<User, "email" | "id"> = {
      name: input.name,
      lastName: input.lastName,
      dataNasc: input.dataNasc,
      cpf: input.cpf,
      address: {
        street: input.address.street,
        numberHome: input.address.numberHome,
        district: input.address.district,
        state: input.address.state,
        country: input.address.country,
      }
    };
    try {
      await this.firestoreProvider.collection(usersCollection)
        .doc(id)
        .update({...user});
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  /**
   * @param {string} id
   */
  async deleteUser(id: string): Promise<boolean | null> {
    const userRef = this.firestoreProvider.collection(usersCollection);
    const userDoc = await userRef.doc(id).get();
    if (!userDoc.exists) {
      return null;
    }
    try {
      await this.firestoreProvider.collection(usersCollection)
        .doc(id).delete();
      return true;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

