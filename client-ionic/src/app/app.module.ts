import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CupsComponent } from './components/cups/cups.component';
import { CupDetailComponent } from './components/cup-detail/cup-detail.component';
import { GroupsComponent } from './components/groups/groups.component';
import { GroupDetailComponent } from './components/group-detail/group-detail.component';
import { TeamsComponent } from './components/teams/teams.component';
import { TeamDetailComponent } from './components/team-detail/team-detail.component';
import { GamesComponent } from './components/games/games.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EditModalTeamsComponent } from './components/modal/edit-modal-teams/edit-modal-teams.component';

@NgModule({
  declarations: [
    AppComponent,
    CupsComponent,
    CupDetailComponent,
    GroupsComponent,
    GroupDetailComponent,
    TeamsComponent,
    TeamDetailComponent,
    GamesComponent,
    GameDetailComponent,
    LoginComponent,
    RegisterComponent,
    EditModalTeamsComponent
    
  ],
    
  entryComponents: [EditModalTeamsComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
