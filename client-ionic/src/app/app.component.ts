
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Cups',
      url: '/cups',
      icon: 'trophy'
    },
    {
      title: 'Groups',
      url: '/groups',
      icon: 'grid'
    },
    {
      title: 'Teams',
      url: '/teams',
      icon: 'people'
    },
    {
      title: 'Games',
      url: '/games',
      icon: 'tennisball'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
