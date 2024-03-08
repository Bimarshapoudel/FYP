import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../../login/login.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const login = inject(LoginService);
  if (login.isLoggedIn() && login.getUserRole() == 'ADMIN') {

    return true;
  }

  router.navigate(['login']);
  return false;

};

