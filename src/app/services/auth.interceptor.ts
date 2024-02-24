import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoginService } from './login/login.service'; // Replace with your actual path


export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const token = inject(LoginService).getToken(); // Inject LoginService using inject

    if (token) {
        req = req.clone({ setHeaders: { 'Authorization': `Bearer ${token}` } });
    }

    return next(req).pipe(
        catchError((error) => {
            if (error.status === 401) {

                return of(error);
            } else {

                return of(error);
            }
        })
    );
};
