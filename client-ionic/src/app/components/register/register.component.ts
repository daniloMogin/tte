import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  myForm: FormGroup;

  registerUserData = {}
  constructor(private _auth: AuthService,
    private _router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      DoB: ['', Validators.required],
      role: ['', Validators.required]



    })

  }

  register() {
    if(this.myForm.valid){
      alert(`Form is valid!!!`);
    } else {
      alert('User form is not valid!!')
    }
  
    console.log('this.myForm');
    console.log(this.myForm);
    
    // this._auth.registerUser(this.registerUserData)
    //   .subscribe(
    //     res => {
    //       console.log(res);

    //     },
    //     err => console.log(err)
    //   )
  }


}
