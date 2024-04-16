import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

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
    return this._http.post(`${baseUrl}/study/upload`, formData).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 409) {
          // Study material already exists
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Study material already exists for this lesson!',
          });
        }
        return throwError('Failed to upload study material. Please try again.');
      })
    );
  }
  public getStudyMaterialofLesson(lid: number) {
    return this._http.get(`${baseUrl}/study/lesson/${lid}`)
  }
  public DeleteStudyMaerial(sid: any) {
    return this._http.delete(`${baseUrl}/study/${sid}`)
  }
}
