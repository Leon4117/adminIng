import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const auth = inject(LoginService);
  const router = inject(Router);

  if(auth.getAuth()){
    router.navigateByUrl('/admin');
    return false;
  }else{
    //router.navigateByUrl('/login');
    return true;
  }
};
