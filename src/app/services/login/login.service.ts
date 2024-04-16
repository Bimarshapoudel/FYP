import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from '../helper';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  public loginStatusSubject = new Subject<boolean>();

  constructor(private http: HttpClient) { }

  //current user:when logged in
  public getCurrentUser() {
    return this.http.get(`${baseUrl}/current-user`)
  }

  // generate token

  public generateToken(loginData: any): Observable<any> {

    return this.http.post(`${baseUrl}/generate-token`, loginData);
  }

  // login user: set token in localStorage
  public loginUser(token: any) {
    localStorage.setItem("token", token);

    return true;
  }

  //isLogn: user is logged in or not

  public isLoggedIn() {
    let tokenStr = localStorage.getItem("token")
    if (tokenStr == undefined || tokenStr == '' || tokenStr == null) {
      return false;
    } else {
      return true;
    }
  }

  // logout: remove token form local storage

  public logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    return true;
  }

  // get token
  public getToken() {
    return localStorage.getItem('token');
  }

  //set userDetail
  public setUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user));
  }
  // get User
  public getUser() {
    let userStr = localStorage.getItem('user');

    if (userStr != null) {
      return JSON.parse(userStr);
    } else {
      this.logout();
      return null;
    }
  }
  getUserId(): number | null {
    let user = this.getUser();
    return user.id;
  }

  //get user role
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }


}
