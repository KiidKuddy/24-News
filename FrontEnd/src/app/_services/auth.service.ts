import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthService {
  private readonly baseUrl = 'http://localhost:3000/api/';
  private jwtHelper = new JwtHelperService();

  constructor(private _http: HttpClient) {}

  login(model: any) {
    return this._http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getLoggedUserId() {
    const token = localStorage.getItem('token');
    return this.jwtHelper.decodeToken(token).userId;
  }
  
  getLoggedUserName() {
    const token = localStorage.getItem('token');
    return this.jwtHelper.decodeToken(token).name;
  }
}
