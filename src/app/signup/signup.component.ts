import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { UserService } from '../shared/user.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signup: any;
  fethed: any;
  localdata: any;
  user: any = {}
  students: any;
  constructor(private fb: FormBuilder, private userservice: UserService) { }

  ngOnInit(): void {
    this.initsignupForm();
    this.localdata = localStorage.getItem('signupdetails')
    this.fethed = JSON.parse(this.localdata)
    this.getstudents()
    // this.poststudents();
  }

  initsignupForm() {
    this.signup = this.fb.group({
      name: ["", [Validators.required]],
      mobile: ["", [Validators.required]],
      password: ["", [Validators.required]],
    })



  }

  register() {
    if (this.signup.valid) {
      this.students.push(this.signup.value)
    }
    this.user = Object.assign(this.user, this.signup.value);
    this.adduser(this.user)
    this.signup.reset()
  }

  adduser(user: any) {
    let users = []
    if (localStorage.getItem('signupdetails')) {
      users = JSON.parse(localStorage.getItem('signupdetails') || '{}');
      users = [user, ...users]

    } else {
      users = [user]
    }
    localStorage.setItem("signupdetails", JSON.stringify(users))
  }

  getstudents() {
    this.userservice.getStudents().subscribe((data: any) => {
      console.log('getting data from data.json', data.students)
    })
  }

  poststudents() {

    const datafrominput = {
      // id:11,
      name: this.signup.value.name,
      mobile: this.signup.value.mobile,
      password: this.signup.value.password,
    }

    this.userservice.poststudents(datafrominput).subscribe((res: any) => {
      console.log('inputvalues', res)
    })
    alert('registraion successfull')

    window.location.reload()

  }

}
