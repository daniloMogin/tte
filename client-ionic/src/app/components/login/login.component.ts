import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

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

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/cups']);
    }
  }

  login() {
    this.authService.loginUser(this.user.username, this.user.password).subscribe(response => {
      if (response.success) {
        localStorage.setItem('token', response.msg.token.replace('JWT ', ''));
        this.router.navigate(["/cups"]);
      }
    });
  }

}
