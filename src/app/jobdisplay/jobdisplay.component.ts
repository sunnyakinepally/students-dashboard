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
    console.log("Before fetchproducts()");
    this.fetchproducts();
  }
  

  fetchproducts(){
    this.userservice.fetchproducts().subscribe((res:any)=>{
      // console.log("data from API",res)
      this.image=res.image;
      this.data=res;
      console.log(this.data);

    })

  }
  logout(){
    this.routing.navigate([''])
    localStorage.removeItem('details')
  }
}
