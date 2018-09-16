import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import {
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
} from '@angular/material';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';

// // components
import * as fromComponents from './components';

// // containers
import * as fromContainers from './containers';

// services
import * as fromServices from './services';

// routes
export const ROUTES: Routes = [
    {
        path: '',
        component: fromContainers.LoginComponent
    },
    {
        path: 'user-list',
        component: fromContainers.UserComponent
    },
    {
        path: 'user-list/user-profile/:userId',
        component: fromComponents.UserProfile
    },
    {
        path: 'games',
        component: fromContainers.GameComponent
    },
    {
        path: 'games/game-profile/:gameId',
        component: fromContainers.UserComponent
    },
    {
        path: 'leagues',
        component: fromContainers.UserComponent
    },
    {
        path: 'leagues/league-profile/:leagueId',
        component: fromContainers.UserComponent
    },
    {
        path: 'cups',
        component: fromContainers.UserComponent
    },
    {
        path: 'cups/cup-profile/:cupId',
        component: fromContainers.UserComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forChild(ROUTES),
        StoreModule.forFeature('tableTennis', reducers),
        EffectsModule.forFeature(effects),

        MatButtonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule
    ],
    providers: [...fromServices.services, CookieService],
    declarations: [
        ...fromContainers.containers,
        ...fromComponents.userComponents,
        ...fromComponents.gameComponents
    ],
    exports: [
        ...fromContainers.containers,
        ...fromComponents.userComponents,
        ...fromComponents.gameComponents
    ]
})
export class TableTennisModule {}
