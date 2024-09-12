/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable max-len */
var admin = require("firebase-admin");

const serviceAccount = require("./teste-esqueleton-backend-firebase-adminsdk-f1lva-932aee9a9f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const usersCollection = "/users";