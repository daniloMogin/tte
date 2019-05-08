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
  errorMsg;
 
  constructor(private _auth: AuthService,
    private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      DoB: ['', Validators.required],
      role: ['player', Validators.required],
      active: [true],
      additionalInfo: []



    })

  }

  register() {

    if (this.myForm.valid) {

      console.log('this.myForm');
      console.log(this.myForm);

      this._auth.registerUser(this.myForm.value)
        .subscribe(
          res => {
            if (res && res.success) {
              console.log(res);
              this.router.navigate(['/login']);
            }
          }
        );
    }

  }
}
