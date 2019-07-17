import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamTypeService {

  private baseURL = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public findExamTypes(description: string, args: string[]) {
    const query = `
      query {
        examTypes(lDescription: "${description}") { ${args.join()} }
      }
    `;
    return this.http.post(`${this.baseURL}/graphql`, { query }, this.httpHeaders());
  }

  public createExamType(location: any, args: string[] = ['id', 'description']) {
    const query = `
      mutation {
        createExamType(description: "${location.description}") {
          examType {
            ${args.join()}
          }
        }
      }
    `;
    return this.http.post(`${this.baseURL}/graphql`, { query }, this.httpHeaders());
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
