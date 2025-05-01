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
        birthdate: "02/04/1992",
        phone: 1234567890,
        cpf: "405.967.938-04",
        email: "gabriel@gmail.com",
        creditCard: {
          cardNumber: "1234-5678-9012-3456",
          expirationDate: "12/25",
          cvv: 123,
          holderName: "John Doe",
          holderCpf: cpf,
        },
        featuredImage: "https://example.com/image.jpg",
        createdAt: new Date(),
        typeUser: "admin",
      };
      const user: Omit<User, "id"> = User.create({
        name: "John",
        lastName: "Doe",
        birthdate: birthdate,
        phone: 1234567890,
        cpf: cpf,
        email: email,
        creditCard: {
          cardNumber: "1234-5678-9012-3456",
          expirationDate: "12/25",
          cvv: 123,
          holderName: "John Doe",
          holderCpf: cpf,
        },
        featuredImage: "https://example.com/image.jpg",
        typeUser: "user",
      });
      assert.deepEqual(user, expectedUser);
    });
  });
});
