import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken?: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) {
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(environment.firebaseSignUpUrl, {email, password, returnSecureToken: true})
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(environment.firebaseLoginUrl, {email, password, returnSecureToken: true})
  }
}
