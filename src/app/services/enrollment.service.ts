import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {


  constructor(private http: HttpClient) { }

  enrollUserInCategory(userId: number, categoryId: number) {
    const url = `${baseUrl}/enrollment/?userId=${userId}&categoryId=${categoryId}`
    const body = { userId, categoryId };
    return this.http.post<any>(url, body);
  }

  getStudentsByCategory(categoryName: string): Observable<any> {
    return this.http.get<any>(`${baseUrl}/enrollment/students`, { params: { categoryName } });
  }

  getTeacherByCategory(categoryName: string): Observable<any> {
    return this.http.get<any>(`${baseUrl}/enrollment/teachers`, { params: { categoryName } });
  }
}
