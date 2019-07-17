import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {

  private baseURL = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public findLocations(description: string, args: string[]) {
    const query = `
      query {
        locations(lDescription: "${description}") { ${args.join()} }
      }
    `;
    return this.http.post(`${this.baseURL}/graphql`, { query }, this.httpHeaders());
  }

  public createLocation(location: any, args: string[] = ['id', 'description']) {
    const query = `
      mutation {
        createLocation(description: "${location.description}") {
          location {
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
