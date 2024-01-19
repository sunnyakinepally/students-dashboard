import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private userservice:UserService, private router:Router){}
  canActivate(): boolean {  
    const token=localStorage.getItem('Token')
    if(token){
     try{

      const decodedToken: any = jwtDecode(token);

     return true
     
     }
     catch (error) {
      alert('You cannot hack mf')
      console.error('Error decoding or verifying token:', error);
      this.router.navigate(['/']);
      return false;
    }
    }
     // No token found
     alert('You cannot overtake')
     this.router.navigate(['/']);
     return false;
}
}
