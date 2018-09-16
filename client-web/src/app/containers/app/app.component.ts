import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    styleUrls: ['app.component.scss'],
    template: `
    <div class="app">
      <div class="app__header">
        <img src="/assets/img/logo.svg" class="app__logo">
      </div>
      <div class="app__content">
        <div class="app__nav">
          <a routerLink="tt/user-list" routerLinkActive="active">Users</a>
          <a routerLink="tt/games" routerLinkActive="active">Games</a>
          <a routerLink="tt/leagues" routerLinkActive="active">Leagues</a>
          <a routerLink="tt/cups" routerLinkActive="active">Cups</a>
        </div>
        <div class="app__container">
          <router-outlet></router-outlet>
        </div>
        <div class="app__footer">
          <p>&copy; Table Tennis EnLight.</p>
        </div>
      </div>
    </div>
    `
})
export class AppComponent {}
