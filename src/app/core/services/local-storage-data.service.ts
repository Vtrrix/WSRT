import { Injectable } from '@angular/core';

@Injectable()
//   {
//   providedIn: 'root',
// }
export class LocalStorageDataService {
  private username: string | null;
  private accessToken: string | null;
  private jwtToken: string | null;

  constructor() {
    this.username = localStorage.getItem('username');
    this.accessToken = localStorage.getItem('accessToken');
    this.jwtToken = localStorage.getItem('token');
  }

  set setUsername(username: string) {
    this.username = username;
    localStorage.setItem('username', username);
  }
  set setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
    localStorage.setItem('accessToken', accessToken);
  }
  set setJwtToken(jwtToken: string) {
    this.jwtToken = jwtToken;
    localStorage.setItem('token', jwtToken);
  }

  get getUsername() {
    return this.username ? this.username : localStorage.getItem('username');
  }
  get getAccessToken() {
    return this.accessToken
      ? this.accessToken
      : localStorage.getItem('accessToken');
  }
  get getJwtToken() {
    return this.jwtToken ? this.jwtToken : localStorage.getItem('token');
  }

  removeData(key: string) {
    localStorage.removeItem(key);
  }
}
