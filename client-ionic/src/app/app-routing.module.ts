import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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

// const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'home',
//     pathMatch: 'full'
//   },
//   {
//     path: 'home',
//     loadChildren: './home/home.module#HomePageModule'
//   },
//   {
//     path: 'list',
//     loadChildren: './list/list.module#ListPageModule'
//   }
// ];

const routes: Routes = [
  { path: 'cups', component: CupsComponent },
  { path: 'cups/:id', component: CupDetailComponent },
  { path: 'groups', component: GroupsComponent },
  { path: 'groups/:id', component: GroupDetailComponent },
  { path: 'teams', component: TeamsComponent },
  { path: 'teams/:id', component: TeamDetailComponent },
  { path: 'games', component: GamesComponent },
  { path: 'games/:id', component: GameDetailComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/cups', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
