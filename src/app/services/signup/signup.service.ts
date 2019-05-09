import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  private baseURL = environment.baseUrl;

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
