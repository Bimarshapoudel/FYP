import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  //load all the categories
  public categories() {
    return this.http.get(`${baseUrl}/category/`)
  }

  //add new category
  public addCategory(category: any) {
    return this.http.post(`${baseUrl}/category/`, category);
  }
  getEnrolledCourses(userId: any) {
    return this.http.get(`${baseUrl}/enrollment/user/${userId}/categories`);
  }
  public updateCategory(category: any) {
    return this.http.put(`${baseUrl}/category/`, category)
  }
  public getCategory(cid: any) {
    return this.http.get(`${baseUrl}/category/${cid}`)
  }
}
