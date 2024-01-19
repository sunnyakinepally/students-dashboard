import { Component, Input } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { FormBuilder,Validators } from '@angular/forms';
import { __values } from 'tslib';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { filter } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  
})
export class HomeComponent {
  data: any;
  update: any;
  logeduser: any;
  user: any;
  add: any;
  selectedLevel:string = '';
  filtered_data: any;
  serachresult:any=[];
  searchvalue: any;
  
  


  constructor(private userservice:UserService, private routing:Router, private fb:FormBuilder){}
  ngOnInit(): void {
this.displaystudents();
this.initform();
this.addinit();
this.logeduser=localStorage.getItem("details")
this.user=JSON.parse((this.logeduser) || 's')
console.log('logeduser',this.user)
  }

addinit(){
  this.add=this.fb.group({
    // id:["", [Validators.required]],
    name:["",[Validators.required]],
    mobile:["",[Validators.required]],
    password:["",[Validators.required]],
    amount:["",[Validators.required]],
    grade:["",[Validators.required]]
  })
}

updateinit(){
this.userservice.getStudents().subscribe((res:any)=>{
  const filter =res.students.filter((value:any)=>value.id==this.user[0].id)
  console.log('filterd user for profile',filter[0].name)
  this.update = this.fb.group({
    id:filter[0].id,
    name:filter[0].name,
    mobile: filter[0].mobile,
    password: filter[0].password,
    amount:filter[0].amount,
    grade:filter[0].grade
  })
})

  
}

updatemember(item:any){
console.log('member',item.id)
this.update = this.fb.group({
  id:item.id,
  name:item.name,
  mobile: item.mobile,
  password:item.password,
  amount:item.amount,
  grade:item.grade
})
}

initform(){
  this.update=this.fb.group({
    id:["", [Validators.required]],
    name:["",[Validators.required]],
    mobile:["",[Validators.required]],
    password:["",[Validators.required]],
    amount:["",[Validators.required]],
    grade:["",[Validators.required]]
  })
}

  displaystudents(){
    this.userservice.getStudents().subscribe((res:any)=>{
this.data=res.students
console.log('displaying students',this.data)

    const filtered = this.data.filter((value:any) => value.id == this.user[0].id);
    if(filtered.length>0){
  const indextoremove=res.students.findIndex((value:any)=>value.id==this.user[0].id);
  console.log('removed',indextoremove)
  res.students.splice(indextoremove,1)

    }
    const data=res.students
    console.log('after',data)
    this.data=data


    })

  }

  addstudent(){
    this.userservice.poststudents(this.add.value).subscribe((res:any)=>{
      console.log('new student',this.add.value)
    })
    window.location.reload();
  }

  deletestudent(item:any){
this.userservice.deletestudents(item).subscribe((res:any)=>{
      console.log('deleted item',res)
 })
    window.location.reload()
  }

  

updateprofile(){
  // console.log('updated details',this.update.value)
  alert('Update Success')
  this.userservice.profileupdate(this.update.value).subscribe((res:any)=>{

  })
  window.location.reload()
}

checkbygrade(){
  // console.log('selected', this.selectedLevel)
switch(this.selectedLevel){
  case 'All': this.displaystudents()
  break;
  case  'Show Above A':
    // const filtered_by_grade=this.data.map((res:any)=>res.grade=='A+')
    this.filtered_data=this.data.filter((res:any)=>res.grade=='A+' || res.grade=='A++' || res.grade=='A')
    this.data=this.filtered_data
    // this.displaystudents()
    console.log('result for A',this.filtered_data)

    
    break;
    
  case 'Show B or Above':
     this.filtered_data=this.data.filter((res:any)=>res.grade=='B' || res.grade=='A+' || res.grade=='A++' || res.grade=='A')
    this.data=this.filtered_data
    console.log('result for A',this.filtered_data)
    break;

    case 'Failed':
      this.filtered_data=this.data.filter((res:any)=>res.grade=='fail')
      this.data=this.filtered_data
      console.log('result of failed',this.filtered_data)
      break;

}

}


search(data:any){
  console.log('search data',data)
  if(!data){
    return this.displaystudents()
  }else{
    this.serachresult=this.data.filter(
      (result:any) => result?.name.toLowerCase().includes(data.toLowerCase())
    );
    // console.log('searched data is',this.serachresult)
    this.data=this.serachresult
  }

}

clear(data:any){
  data.value=''
  this.displaystudents()
}

  logout(){
    localStorage.removeItem('details');
    localStorage.removeItem('Token');
    this.routing.navigate(['']);
  }
}
