/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import {firestore} from "firebase-admin";
import {IUserRepository} from "../../../domain/repositories/userRepositorie";
import {User} from "../../../domain/entity/user/UserEntity";
import {usersCollection} from "../../database/firebase/firebase-config";
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
      id: doc.id,
      name: doc.data().name,
      email: doc.data().email,
      password: doc.data().password,
    }));
    return user as object;
  }
  /**
     * @param {User} user
     */
  async save(user: User): Promise<void> {
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
    await this.firestoreProvider.collection(usersCollection).doc(user.id).create(userData);
  }
  /**
   * @param {string} id
   */
  async getInfoUser(id: string): Promise<Omit<User, "password"> | null> {
    const userRef = this.firestoreProvider.collection(usersCollection).doc(id);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return null;
    }
    const user: Omit<User, "password"> = {
      id: userDoc.data()!.id,
      name: userDoc.data()!.name,
      email: userDoc.data()!.email,
    };
    return user;
  }
  /**
   * @param {string} id
   * @param {User} input
   */
  async updateUser(id: string, input: Omit<User, "password" | "id">): Promise<boolean | null> {
    const userRef = this.firestoreProvider.collection(usersCollection).doc(id);
    const userDoc = await userRef.get();
    if (!userDoc.exists) {
      return null;
    }
    const user: Omit<User, "password" | "id"> = {
      name: input.name,
      email: input.email,
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

