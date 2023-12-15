import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree ,Router} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private userservice:UserService, private router:Router){}
  canActivate(): boolean {  
    if( this.userservice.loggedin()){
     return true
    }else{
    
     this.router.navigate(['/'])
     alert('enter valid credentisl')
     return false
    }
  
}
}
