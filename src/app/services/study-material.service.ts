import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class StudyMaterialService {

  constructor(private _http: HttpClient) { }

  public postStudyMaterial(study: any) {
    let formData = new FormData();
    formData.append("file", study.file)
    formData.append("studyMaterial", JSON.stringify(study))
    return this._http.post(`${baseUrl}/study/`, formData)
  }
}
