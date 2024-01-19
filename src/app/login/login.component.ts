import { Component } from '@angular/core';
import { Validators, FormGroup, FormBuilder, } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { json } from 'express';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  login: any;
  localdata: any;
  fethed: any;
  allusers: any;
  token: any;

  constructor(private fb: FormBuilder, private routing: Router, private UserService: UserService) { }

  ngOnInit(): void {
    this.initLoginForm();
    this.UserService.getStudents().subscribe((res: any) => {
      this.allusers = res
      // console.log('allusers', this.allusers)
    })
  }

  initLoginForm() {
    this.login = this.fb.group({
      mobile: ["", [Validators.required]],
      pass: ["", [Validators.required]],
    })
  }

  submit() {

    // console.log('user', this.login.value.pass)
    // const user = this.login.value
    // console.log('user mobile', user.mobile)
    // console.log('filtered',filtered)
    // if (filtered.length != 0) {
    // localStorage.setItem('details',JSON.stringify(filtered))
    //   alert('login sucess')
    //   this.routing.navigate(['/home'])
    // }
    // else {
    //   alert('Please enter valid credentials or Register first');
    //   window.location.reload()
    // }
    const user = this.login.value
    const filtered = this.allusers.students.filter((value: any) => value.mobile == user.mobile && value.password == user.pass);
    if(filtered.length===0){
      alert('please enter valid credentilas')
      }
    this.UserService.loggedin(user).subscribe((token: string) => {
     
        this.token = token
        localStorage.setItem('Token', this.token)
        this.routing.navigate(['/home'])
     
    })
    
  }


}
