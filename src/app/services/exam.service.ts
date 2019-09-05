import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  public findPendingExams(args: string[] = [
    'id', 'updatedAt', 'photoUrl', 'createdAt', 'description',
    `examType { id, description }`,
    `provider { id, description }`,
    `healthPlan {
      description, 
      cutOffDay }`,
    `location { id, description}`]) {
    const query = `
      query {
        pendingExams(
          pageSize:1
        ) { ${args.join()} }
      }
    `;
    return this.http.post(`${this.baseURL}/graphql`, { query }, this.httpHeaders());
  }

  public findExams(begin: string, end: string, args: string[] = [
    'id', 'updatedAt', 'photoUrl', 'createdAt', 'description',
    `examType { id, description }`,
    `provider { id, description }`,
    `healthPlan { 
      provider { id, description } 
     cutOffDay }`,
    `location { id, description}`]) {
    const query = `
      query {
        exams(
          begin: ${begin}, 
          end: ${end}
        ) { ${args.join()} }
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

  public compressionImage(file: File): Observable<Blob> {
    const formData = new FormData();

    formData.append('file', file);

    return this.http.post(`${environment.compressionImageUrl}/api/v1/image_compressor?size=1200`, formData, { responseType: "blob" });
  }

  public blobToFile(theBlob: any, fileName: string): File {
    const b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return new File([theBlob], theBlob.name, { type: theBlob.type });;
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