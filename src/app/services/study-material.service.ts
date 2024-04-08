import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class StudyMaterialService {

  constructor(private _http: HttpClient) { }

  public postStudyMaterial(file: File, lessonId: number, description: string) {
    let formData = new FormData();
    formData.append("file", file)
    formData.append('lessonId', lessonId.toString());
    formData.append('description', description);
    return this._http.post(`${baseUrl}/study/upload`, formData)
  }
  public getStudyMaterialofLesson(lid: number) {
    return this._http.get(`${baseUrl}/study/lesson/${lid}`)
  }
}
