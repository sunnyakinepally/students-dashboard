import { Component } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-jobdisplay',
  templateUrl: './jobdisplay.component.html',
  styleUrls: ['./jobdisplay.component.css']
})
export class JobdisplayComponent {
  image: any;
  data: any;
  datalist: any;

  constructor(private userservice:UserService, private routing:Router){}

  ngOnInit(): void {

  }
  

  logout(){
    this.routing.navigate([''])
    localStorage.removeItem('details')
  }
}
