import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {
  constructor(private authService: AuthService, private router: Router, private toastController: ToastController ) {}

  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.presentToast();
      this.router.navigate(['/login']);
      return false;
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Please log in',
      duration: 2000000,
      position: 'bottom',
      cssClass: 'loginToast',
      color: 'primary'
    });
    toast.present();
  }
}
