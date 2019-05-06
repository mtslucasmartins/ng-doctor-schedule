import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  private baseURL = 'http://localhost:5000';

  constructor(private http: HttpClient) { }

  public signup(user: any): Observable<any> {
    return this.http.post(`${this.baseURL}/signup`, user, this.headers());
  }

  private headers() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

}
