import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HealthPlanService {

  private baseURL = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public findHealthPlans(description: string, providerId: number, args: string[]) {
    const query = `
      query {
        healthPlans(lDescription: "${description}", providerId: ${providerId}) { ${args.join()} }
      }
    `;
    return this.http.post(`${this.baseURL}/graphql`, { query }, this.httpHeaders());
  }

  public createHealthPlan(healthPlan: any, providerId: number, args: string[] = ['id', 'description']) {
    const query = `
      mutation {
        createHealthPlan(description: "${healthPlan.description}", providerId: ${providerId}) {
          healthPlan {
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
