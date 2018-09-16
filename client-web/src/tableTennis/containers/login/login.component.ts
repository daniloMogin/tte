//#region Imports
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUser } from '../../models/user.model';

import * as fromStore from '../../store';
//#endregion

@Component({
    selector: 'login',
    styleUrls: ['login.component.scss'],
    template: `
    <div class="login">
        <user-login 
        (login)="onLogin($event)"></user-login>
    </div>
  `
})
export class LoginComponent {
    constructor(private store: Store<fromStore.TableTennisState>) {}

    onLogin(event: IUser) {
        this.store.dispatch(new fromStore.LoginUser(event));
    }
}
