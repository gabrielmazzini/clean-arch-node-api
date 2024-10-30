"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorInvalidEmail = exports.ErrorInvalidBirthdate = exports.ErrorInvalidCpf = exports.ErrorNoUsersCollection = exports.ErrorInvalidFields = exports.ErrorUserAlreadyExists = exports.ErrorUserNotFound = void 0;
/**
 */
class ErrorUserNotFound extends Error {
    /**
       * @param {string} message
       */
    constructor(message) {
        super(message);
        this.message = message;
    }
}
exports.ErrorUserNotFound = ErrorUserNotFound;
/**
 */
class ErrorUserAlreadyExists extends Error {
    /**
         * @param {string} message
         */
    constructor(message) {
        super(message);
        this.message = message;
    }
}
exports.ErrorUserAlreadyExists = ErrorUserAlreadyExists;
/**
 */
class ErrorInvalidFields extends Error {
    /**
      * @param {string} message
      */
    constructor(message) {
        super(message);
        this.message = message;
    }
}
exports.ErrorInvalidFields = ErrorInvalidFields;
/**
 */
class ErrorNoUsersCollection extends Error {
    /**
      * @param {string} message
      */
    constructor(message) {
        super(message);
        this.message = message;
    }
}
exports.ErrorNoUsersCollection = ErrorNoUsersCollection;
/**
 */
class ErrorInvalidCpf extends Error {
    /**
      * @param {string} message
      */
    constructor(message) {
        super(message);
        this.message = message;
    }
}
exports.ErrorInvalidCpf = ErrorInvalidCpf;
/**
 */
class ErrorInvalidBirthdate extends Error {
    /**
      * @param {string} message
      */
    constructor(message) {
        super(message);
        this.message = message;
    }
}
exports.ErrorInvalidBirthdate = ErrorInvalidBirthdate;
/**
 */
class ErrorInvalidEmail extends Error {
    /**
      * @param {string} message
      */
    constructor(message) {
        super(message);
        this.message = message;
    }
}
exports.ErrorInvalidEmail = ErrorInvalidEmail;
