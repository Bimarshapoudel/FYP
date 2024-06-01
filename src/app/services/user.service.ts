import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  //add user
  public addUser(user: any): Observable<any> {
    return this.http.post(`${baseUrl}/user/`, user);
  }

  public activateAccount(token: string): Observable<any> {
    const url = `${baseUrl}/activate-account?token=${token}`;
    return this.http.get(url);
  }

  public getStudents() {
    return this.http.get(`${baseUrl}/user/students`)
  }
  public getTeachers() {
    return this.http.get(`${baseUrl}/user/teachers`)
  }

  changePassword(userId: number, newPassword: string): Observable<any> {
    const url = `${baseUrl}/user/${userId}/change-password?newPassword=${newPassword}`;
    return this.http.put(url, {});
  }

}
