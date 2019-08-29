import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  private baseURL = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public createExam(photoUrl: string, examTypeId: string, locationId: string, providerId: string, healthPlanId: string, args: string[] = ['id', 'description']) {
    const query = `
    mutation {
      createExam(
        description: "",
        procedureCode: "",
        photoUrl: "${photoUrl}",
        examTypeId: ${examTypeId},
        locationId: ${locationId},
        providerId: ${providerId},
        healthPlanId: ${healthPlanId},
      ) {
        exam {
          ${args.join()}
        }
      }
    }
    `;
    return this.http.post(`${this.baseURL}/graphql`, { query }, this.httpHeaders());
  }

  public upload(file: File) {
    const formData = new FormData();

    formData.append('file', file);

    return this.http.post(`https://s4.ottimizzacontabil.com:55325/storage/ng-doctor-schedule/accounting/doctor/store`, formData,
      {
        'headers': new HttpHeaders({
          'Authorization': `${localStorage.getItem('access_token')}`
        })
      }
    )
  }

  private httpHeaders() {
    return {
      'headers': new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      })
    };
  }

}