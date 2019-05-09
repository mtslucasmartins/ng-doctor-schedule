import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseURL = environment.baseUrl;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    // Check whether the token is expired
    return !this.jwtHelper.isTokenExpired(token);
  }

  public signin(credentials: any): Observable<any> {
    return this.http.post(`${this.baseURL}/auth/token`, credentials, this.headers());
  }

  public refresh(): Observable<any> {
    return this.http.post(`${this.baseURL}/auth/refresh`, {}, this.httpRefreshTokenHeaders());
  }

  public httpRefreshTokenHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('refresh_token')}`
      })
    };
  }

  private headers() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }
}
