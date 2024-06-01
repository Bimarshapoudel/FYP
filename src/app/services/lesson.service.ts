import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private http: HttpClient) {

  }
  public lessons() {
    return this.http.get(`${baseUrl}/lesson/`)
  }

  public addlesson(lesson: any) {
    return this.http.post(`${baseUrl}/lesson/`, lesson)
  }

  public deleteLesson(lid: any) {
    return this.http.delete(`${baseUrl}/lesson/${lid}`)
  }

  public getLesson(lid: any) {
    return this.http.get(`${baseUrl}/lesson/${lid}`)
  }
  public updateLessson(lesson: any) {
    return this.http.put(`${baseUrl}/lesson/`, lesson)
  }
  public getLessonOfCategory(cid: number) {
    return this.http.get(`${baseUrl}/lesson/category/${cid}`)
  }
}
