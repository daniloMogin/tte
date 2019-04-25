import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUserData = {}
  constructor(private _auth: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  register() {
    this._auth.registerUser(this.registerUserData)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/login']);

        },
        err => console.log(err)
      )
  }


}
