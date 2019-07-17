import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  private baseURL = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public findProviders(description: string, args: string[]) {
    const query = `
      query {
        providers(lDescription: "${description}") { ${args.join()} }
      }
    `;
    return this.http.post(`${this.baseURL}/graphql`, { query }, this.httpHeaders());
  }

  public createProvider(location: any, args: string[] = ['id', 'description']) {
    const query = `
      mutation {
        createProvider(description: "${location.description}") {
          provider {
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
