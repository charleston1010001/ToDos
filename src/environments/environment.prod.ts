const firebaseApiKey = 'AIzaSyCnL1eCy-KWq7pCd8_e1CtZc-uqO9d7ct0';
const firebaseBaseUrl = 'https://todos-2e411.firebaseio.com';

export const environment = {
  production: true,
  firebaseApiKey,
  firebaseSignUpUrl: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebaseApiKey}`,
  firebaseLoginUrl: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseApiKey}`,
  firebaseUsersUrl: `${firebaseBaseUrl}/users`
};
