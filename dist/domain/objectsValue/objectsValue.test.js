"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = require("node:assert");
const Birthdate_1 = require("./Birthdate");
const Cpf_1 = require("./Cpf");
const Email_1 = require("./Email");
(0, node_test_1.describe)("#Test Object Values", () => {
    (0, node_test_1.describe)("Birthdate", () => {
        (0, node_test_1.it)("birthdate, test valid date", () => {
            const dateValid = "1992-04-02";
            const birthdate = new Birthdate_1.Birthdate(dateValid);
            node_assert_1.strict.equal(birthdate.value().toISOString().slice(0, 10), dateValid);
        });
        (0, node_test_1.it)("Test birthdate, in future", () => {
            const dateFuture = "2026/04/02";
            node_assert_1.strict.throws(() => {
                new Birthdate_1.Birthdate(dateFuture);
            }, new Error("Invalid date of birth"));
        });
        (0, node_test_1.it)("Birthdate, valid and format correctly", () => {
            const dateValid = "1992/04/02";
            const birthdate = new Birthdate_1.Birthdate(dateValid);
            node_assert_1.strict.equal(birthdate.format(), "02/04/1992");
        });
        (0, node_test_1.it)("test very old date of birth", () => {
            const dateOld = "1900/02/04";
            node_assert_1.strict.throws(() => {
                const birthdate = new Birthdate_1.Birthdate(dateOld);
            }, new Error("Invalid date of birth"));
        });
    });
    (0, node_test_1.describe)("CPF", () => {
        (0, node_test_1.it)("Cpf valid", () => {
            const cpfValid = "405.967.938-04";
            const cpf = new Cpf_1.CPF(cpfValid);
            node_assert_1.strict.equal(cpf.value(), cpfValid.replace(/\D/g, ''));
        });
        (0, node_test_1.it)("Cpf invalid, incorrect check digits", () => {
            const cpfInvalid = "405.967.938-09";
            node_assert_1.strict.throws(() => {
                new Cpf_1.CPF(cpfInvalid);
            }, new Error("Invalid CPF"));
        });
        (0, node_test_1.it)("Cpf invalid, less than 11 digits", () => {
            const cpfInvalid = "405.967.938";
            node_assert_1.strict.throws(() => {
                new Cpf_1.CPF(cpfInvalid);
            }, new Error("Invalid CPF"));
        });
        (0, node_test_1.it)("Cpf invalid, repeated sequence", () => {
            const cpfInvalid = "444.444.444.44";
            node_assert_1.strict.throws(() => {
                new Cpf_1.CPF(cpfInvalid);
            }, new Error("Invalid CPF"));
        });
        (0, node_test_1.it)("Cpf invalid, invalid characters", () => {
            const cpfInvalid = "405.9h6.938.aa";
            node_assert_1.strict.throws(() => {
                new Cpf_1.CPF(cpfInvalid);
            }, new Error("Invalid CPF"));
        });
    });
    (0, node_test_1.describe)("Email", () => {
        (0, node_test_1.it)("Email is valid", () => {
            const emailValid = "gabriel@gmail.com";
            const email = new Email_1.Email(emailValid);
            node_assert_1.strict.equal(email.value(), emailValid);
        });
        (0, node_test_1.it)("Email is not valid, no burr", () => {
            const emailInvalid = "gabriel.com";
            node_assert_1.strict.throws(() => {
                new Email_1.Email(emailInvalid);
            }, new Error("Invalid email"));
        });
        (0, node_test_1.it)("Email is not valid, no domain", () => {
            const emailInvalid = "gabriel@.com";
            node_assert_1.strict.throws(() => {
                new Email_1.Email(emailInvalid);
            }, new Error("Invalid email"));
        });
        (0, node_test_1.it)("Email is not valid, no username", () => {
            const emailInvalid = "@gmail.com";
            node_assert_1.strict.throws(() => {
                new Email_1.Email(emailInvalid);
            }, new Error("Invalid email"));
        });
        (0, node_test_1.it)("Email is not valid, incorrect domain", () => {
            const emailInvalid = "gabriel@gmail";
            node_assert_1.strict.throws(() => {
                new Email_1.Email(emailInvalid);
            }, new Error("Invalid email"));
        });
        (0, node_test_1.it)("Email is not valid, invalid characters", () => {
            const emailInvalid = "usuario@domínio.com";
            node_assert_1.strict.throws(() => {
                const email = new Email_1.Email(emailInvalid);
            }, new Error("Invalid email"));
        });
    });
});
