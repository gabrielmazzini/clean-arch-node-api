import {describe, it} from "node:test";
import {strict as assert} from "node:assert";
import {Birthdate} from "./Birthdate";
import {CPF} from "./Cpf";
import {Email} from "./Email";

describe("#Test Object Values", () => {
  describe("Birthdate", () => {
    it("birthdate, test valid date", () => {
      const dateValid = "1992-04-02";
      const birthdate = new Birthdate(dateValid);
      assert.equal(birthdate.value().toISOString().slice(0, 10), dateValid);
    });
    it("Test birthdate, in future", () => {
      const dateFuture = "2026/04/02";
      assert.throws(() => {
        new Birthdate(dateFuture);
      }, new Error("Invalid date of birth"));
    });
    it("Birthdate, valid and format correctly", () => {
      const dateValid = "1992/04/02";
      const birthdate = new Birthdate(dateValid);
      assert.equal(birthdate.format(), "02/04/1992");
    });
    it("test very old date of birth", () => {
      const dateOld = "1900/02/04";
      assert.throws(() => {
        new Birthdate(dateOld);
      }, new Error("Invalid date of birth"));
    });
  });

  describe("CPF", () => {
    it("Cpf valid", () => {
      const cpfValid = "405.967.938-04";
      const cpf = new CPF(cpfValid);
      assert.equal(cpf.value(), cpfValid.replace(/\D/g, ""));
    });
    it("Cpf invalid, incorrect check digits", () => {
      const cpfInvalid = "405.967.938-09";
      assert.throws(() => {
        new CPF(cpfInvalid);
      }, new Error("Invalid CPF"));
    });
    it("Cpf invalid, less than 11 digits", () => {
      const cpfInvalid = "405.967.938";
      assert.throws(() => {
        new CPF(cpfInvalid);
      }, new Error("Invalid CPF"));
    });
    it("Cpf invalid, repeated sequence", () => {
      const cpfInvalid = "444.444.444.44";
      assert.throws(() => {
        new CPF(cpfInvalid);
      }, new Error("Invalid CPF"));
    });
    it("Cpf invalid, invalid characters", () => {
      const cpfInvalid = "405.9h6.938.aa";
      assert.throws(() => {
        new CPF(cpfInvalid);
      }, new Error("Invalid CPF"));
    });
  });

  describe("Email", () => {
    it("Email is valid", () => {
      const emailValid = "gabriel@gmail.com";
      const email = new Email(emailValid);
      assert.equal(email.value(), emailValid);
    });
    it("Email is not valid, no burr", () => {
      const emailInvalid = "gabriel.com";
      assert.throws(() => {
        new Email(emailInvalid);
      }, new Error("Invalid email"));
    });
    it("Email is not valid, no domain", () => {
      const emailInvalid = "gabriel@.com";
      assert.throws(() => {
        new Email(emailInvalid);
      }, new Error("Invalid email"));
    });
    it("Email is not valid, no username", () => {
      const emailInvalid = "@gmail.com";
      assert.throws(() => {
        new Email(emailInvalid);
      }, new Error("Invalid email"));
    });
    it("Email is not valid, incorrect domain", () => {
      const emailInvalid = "gabriel@gmail";
      assert.throws(() => {
        new Email(emailInvalid);
      }, new Error("Invalid email"));
    });
    it("Email is not valid, invalid characters", () => {
      const emailInvalid = "usuario@domínio.com";
      assert.throws(() => {
        new Email(emailInvalid);
      }, new Error("Invalid email"));
    });
  });
});
