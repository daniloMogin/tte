//#region Imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
    StoreRouterConnectingModule,
    RouterStateSerializer
} from '@ngrx/router-store';

import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects, CustomSerializer } from './store';

// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

// this would be done dynamically with webpack for builds
const environment = {
    development: true,
    production: false
};

export const metaReducers: MetaReducer<any>[] = !environment.production
    ? [storeFreeze]
    : [];

import { AppComponent } from './containers/app/app.component';
//#endregion

// routes
export const ROUTES: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'tt' },
    {
        path: 'tt',
        loadChildren: '../tableTennis/tableTennis.module#TableTennisModule'
    }
];

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(ROUTES),
        StoreModule.forRoot(reducers, { metaReducers }),
        EffectsModule.forRoot(effects),
        StoreRouterConnectingModule,
        environment.development ? StoreDevtoolsModule.instrument() : []
    ],
    providers: [{ provide: RouterStateSerializer, useClass: CustomSerializer }],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
