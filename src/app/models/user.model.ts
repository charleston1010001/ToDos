export class UserModel {
  constructor(public email: string, public userId: string, public token: string, public expirationDate: Date) {
  }

  get authToken() {
    if (this.expirationDate.getTime() <= new Date().getTime()) {
      return null;
    }
    return this.token;
  }
}
