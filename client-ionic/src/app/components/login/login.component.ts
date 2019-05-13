import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showBar: boolean = false;
  user: any = {
    username: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/cups']);
    }
  }

  login() {
    this.showBar = true;
    this.authService.loginUser(this.user.username, this.user.password).subscribe(response => {
      if (response.success) {
        localStorage.setItem('token', response.msg.token.replace('JWT ', ''));
        this.router.navigate(["/cups"]);
        this.showBar = false;
        this.notificationService.showToast({message: `Welcome ${this.user.username}!`});
      }
    });
  }


}
