import { Component, } from '@angular/core';
import { UserService } from '../shared/user.service';
import { FormsModule,FormArray,FormGroup, FormBuilder, Validators, } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  result:any=[];
  singleuser: any;
  search: any;
  favourite: any;
  found: any;
  prevdata: any;
  favorite: any=[];
  choosen: any='';
constructor(private userservice:UserService, private fb:FormBuilder){}
  ngOnInit(): void {
    // this.userservice.getallusers().subscribe(data=>)
    this.getusers();
    this.user(1)
    this.initform()
    // this.getinput()
   
  }
  getusers() {
   this.userservice.getallusers().subscribe((res:any)=>{
    this.result=res
    // console.log("reslut",this.result)
   this.checkingFavourite();

   })
  }
user(id:any){
  this.singleuser=id;
// console.log("single user",this.singleuser)
}
initform(){
  this.search=this.fb.group({
    input_data:["",[Validators.required]]
  })
}
getinput(){
let data=this.search.value.input_data
// console.log("inputdata",data) 
this.userservice.searchresult(data).subscribe((res:any)=>{
  console.log("result of search",res.items)
  this.result=res.items
})
}

checkingFavourite() {
  this.favorite = JSON.parse(localStorage.getItem('favorite') as string)
  this.result = this.result.map((data: any) => {
    this.found = this.favorite.find((element: any) => element.login == data.login)
    if (this.found) {
      if (data.login == this.found.login) {
        return { ...data, heart: true };
      }
    } else {
      return { ...data, heart: false };

    }
  })
}
onToggle(i: any) {
  window.location.reload()
  this.favorite = [];
  this.favorite = JSON.parse(localStorage.getItem('favorite') as string)
  if (localStorage.getItem('favorite')) {
    this.favorite = JSON.parse(localStorage.getItem('favorite') as string)
    this.favorite = [...this.favorite, i]
  } else {
    this.favorite = [i]
  }
  localStorage.setItem('favorite', JSON.stringify(this.favorite))
}


removed(i: any) {
  this.favorite = JSON.parse(localStorage.getItem('favorite') as string)
  let index = this.favorite.findIndex((e: any) => e.id == i.id);
  if (index !== -1) {
    this.favorite.splice(index, 1)
  }
  this.favorite = [...this.favorite]
  localStorage.setItem('favorite', JSON.stringify(this.favorite))
  window.location.reload()
}

sort(){

switch(this.choosen){
  case 'favourite':
    this.favorite = JSON.parse(localStorage.getItem('favorite') as string)
    this.result=this.favorite
    this.checkingFavourite()
break;
case 'All':this.getusers()
}
}


}

