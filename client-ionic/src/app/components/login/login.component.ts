import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: any = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.loginUser(this.user.username, this.user.password).subscribe(response => {
      console.log(response);
    });
  }

}
