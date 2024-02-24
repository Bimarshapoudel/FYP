import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../login/login.service';
import { inject } from '@angular/core';

export const teacherGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const login = inject(LoginService);
  if (login.isLoggedIn() && login.getUserRole() == 'Teacher') {
    return true;
  }

  router.navigate(['login']);
  return false;

};
