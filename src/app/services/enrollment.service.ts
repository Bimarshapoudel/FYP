import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

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
}
