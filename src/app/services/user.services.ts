import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public findUsers(args: string[]) {
    const query = `
      query {
        users {
          ${args.join()}
        }
      }
    `;
    return this.http.post(`${this.baseURL}/graphql`, { query }, this.httpHeaders());
  }

  public getAllUsers(pageIndex: number = 0, pageSize: number = 10): Observable<any> {
    return this.http.get(`${this.baseURL}/users?page_index=${pageIndex}&page_size=${pageSize}`, this.httpHeaders());
  }

  public getUserById(id: number): Observable<any> {
    return this.http.get(`${this.baseURL}/users/${id}`, this.httpHeaders());
  }

  public httpHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      })
    };
  }

}
