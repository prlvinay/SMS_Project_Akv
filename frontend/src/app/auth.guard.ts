import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthServiceService } from './services/auth-service.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authservice=inject(AuthServiceService)
  const router=inject(Router);
  const token=authservice.getToken()
  if(token){
    return true;
  }else{
    router.navigate(['/login']);
    return false;
  }
  
};
