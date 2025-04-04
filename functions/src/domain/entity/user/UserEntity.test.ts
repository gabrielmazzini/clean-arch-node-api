import {describe, before, after, it} from "node:test";
import crypto = require("node:crypto");
import assert = require("node:assert");
import {Birthdate} from "../../objectsValue/Birthdate";
import {CPF} from "../../objectsValue/Cpf";
import {Email} from "../../objectsValue/Email";
import {User} from "./UserEntity";

describe("User entity", () => {
  describe("test creating valid user", () => {
    const birthdate = new Birthdate("1992-04-02");
    const cpf = new CPF("935.411.347-80");
    const email = new Email("john.doe@example.com");
    const idFixed = "5c484254-c10c-43e6-b252-fcbe2a42c90e";

    before(() => {
      crypto.randomUUID = () => idFixed;
    });

    after(async () => {
      crypto.randomUUID = (await import("node:crypto")).randomUUID;
    });

    it("you must create a user", () => {
      const expectedUser = {
        id: idFixed,
        name: "John",
        lastName: "Doe",
        birthdate: birthdate,
        cpf: cpf,
        email: email,
        address: {
          street: "Rua das Flores",
          complement: "Apt 301",
          numberHome: "123",
          district: "Centro",
          state: "SP",
          city: "São Paulo",
          country: "Brasil",
        },
      _typeUser: "admin",
      };
      const user: Omit<User, "id"> = User.create({
        name: "John",
        lastName: "Doe",
        birthdate: birthdate,
        cpf: cpf,
        email: email,
        address: {
          street: "Rua das Flores",
          complement: "Apt 301",
          numberHome: "123",
          district: "Centro",
          state: "SP",
          city: "São Paulo",
          country: "Brasil",
        },
        typeUser: "admin",
      });
      assert.deepEqual(user, expectedUser);
    });
  });
});
