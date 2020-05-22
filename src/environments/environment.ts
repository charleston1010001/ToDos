// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const firebaseApiKey = 'AIzaSyCnL1eCy-KWq7pCd8_e1CtZc-uqO9d7ct0';
const firebaseBaseUrl = 'https://todos-2e411.firebaseio.com';

export const environment = {
  production: false,
  firebaseApiKey,
  firebaseSignUpUrl: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseApiKey}`,
  firebaseLoginUrl: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`,
  firebaseUsersUrl: `${firebaseBaseUrl}/users`
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
