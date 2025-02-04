import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';
//import { AuthServiceService } from './services/auth-service.service';
export const logGuard: CanActivateFn = (route, state) => {
  // const authservice=inject(AuthServiceService)
    const router=inject(Router);
    if(typeof window!=='undefined' && localStorage){
      const token=localStorage.getItem('token');
      if(token){
        console.log(token);
        router.navigate(['/dashboard']);
        return false;
      }else{
        return true;
      }
    }
    return false;
};
