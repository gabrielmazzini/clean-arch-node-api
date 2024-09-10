/**
 */
export class ErrorUserNotFound extends Error {
    /**
       * @param {string} message
       */
    constructor(message: string) {
      super(message);
      this.message = message;
    }
  }
  
  /**
   */
  export class ErrorUserAlreadyExists extends Error {
    /**
         * @param {string} message
         */
    constructor(message: string) {
      super(message);
      this.message = message;
    }
  }
  
  /**
   */
  export class ErrorInvalidFields extends Error {
    /**
      * @param {string} message
      */
    constructor(message: string) {
      super(message);
      this.message = message;
    }
  }
  