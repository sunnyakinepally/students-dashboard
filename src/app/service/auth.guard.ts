import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, window } from 'rxjs';
import { UserService } from '../shared/user.service';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private userservice: UserService, private router: Router) { }
  canActivate(): boolean {
    const token = sessionStorage.getItem('Token')
    const user=localStorage.getItem('details')
   console.log(user)
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        if (decodedToken) {
          return true
         }
      }
      catch (error) {
        alert('You cannot Override')
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
