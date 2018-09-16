//#region Imports
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IUser } from '../../models/user.model';

import * as fromStore from '../../store';
import { Observable } from 'rxjs/Observable';
//#endregion

@Component({
    selector: 'user',
    styleUrls: ['user.component.scss'],
    template: `
    <div class="user">
      <div class="user_list">
        <div *ngIf="!((users$ | async)?.length)">
            No users, add one to get started.
        </div>
        <user-list
            
            [user]="users$">
        </user-list>
      </div>
    </div>
  `
})
export class UserComponent implements OnInit, OnDestroy {
    users$: Observable<IUser[]>;

    constructor(private store: Store<fromStore.TableTennisState>) {}

    ngOnInit() {
        this.users$ = this.store.select<IUser[]>(fromStore.getUsersList);
        this.store.dispatch(new fromStore.LoadUsers());
        // console.log(`this.users$`);
        // console.log(this.users$);
    }

    ngOnDestroy() {

    }
}
