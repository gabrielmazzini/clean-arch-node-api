import {it, before, after, describe} from "node:test";
import crypto = require("node:crypto");
import * as assert from "node:assert";
import { User } from "../../entity/user/UserEntity";
import { UserMapper } from "./user-mapper";
import { Birthdate } from "../../objectsValue/Birthdate";
import { CPF } from "../../objectsValue/Cpf";
import { Email } from "../../objectsValue/Email";

const idFixed = "58fda34c-6a17-48ba-abe5-d1738e9f79de";

describe("User Mapper", () => {
before(() => {
    crypto.randomUUID = () => idFixed;
});

after(async () => {
    crypto.randomUUID = (await import("node:crypto")).randomUUID;
});

it("should create a User entity from data", () => {
    
    const data = {
        id: idFixed,
        name: "Planta Teste",
        lastName: "da planta teste",
        birthdate: new Birthdate("02/04/1992"),
        cpf: new CPF("405.967.938-04"),
        email: new Email("gabriel@gmail.com"),
        address: {
            street: "rua teste",
            complement: "apto 1",
            numberHome: "123",
            district: "bairro teste",
            state: "sp",
            city: "são paulo",
            country: "brasil"
          },
          typeUser: "User"
      };
    const result = UserMapper.toEntity(data);
    const expect = User.create({
        name: data.name,
        lastName: data.lastName,
        birthdate: data.birthdate,
        cpf: data.cpf,
        email: data.email,
        address: {
            street: data.address.street,
            complement: data.address.complement,
            numberHome: data.address.numberHome,
            district: data.address.district,
            state: data.address.state,
            city: data.address.city,
            country: data.address.country
          },
          typeUser: "User"
      });
    assert.deepStrictEqual(expect, result);
});

it("should convert a USer entity to DTO", () => {
    const user = User.create({
        name: "Planta Teste",
        lastName: "da planta teste",
        birthdate: new Birthdate("02/04/1992"),
        cpf: new CPF("405.967.938-04"),
        email: new Email("gabriel@gmail.com"),
        address: {
            street: "rua teste",
            complement: "apto 1",
            numberHome: "123",
            district: "bairro teste",
            state: "sp",
            city: "são paulo",
            country: "brasil"
          },
          typeUser: "User"
      });
    const result = UserMapper.toDto(user);
    const expected = {
        id: user._id,
        name: user._name,
        lastName: user._lastName,
        birthdate: user._birthdate.format(),
        cpf: user._cpf.value(),
        email: user._email.value(),
        address: user._address,
        typeUser: user._typeUser,
    }
    assert.deepStrictEqual(expected, result);
});

it("should merge an objects", () => {
    const user = {
        name: "Planta Teste",
        lastName: "da planta teste",
        birthdate: "02/04/1992",
        cpf: "405.967.938-04",
        email: "gabriel@gmail.com",
      };
    const result = UserMapper.toObject(user);
    const expected = {
        name: user.name,
        lastName: user.lastName,
        birthdate: new Birthdate(user.birthdate),
        cpf: new CPF(user.cpf),
        email: new Email(user.email),
      };
    assert.deepStrictEqual(expected, result);
    });
});
