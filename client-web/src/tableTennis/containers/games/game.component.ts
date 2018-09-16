//#region Imports
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
// import { IUser } from '../../models/user.model';

import * as fromStore from '../../store';
import { Observable } from 'rxjs/Observable';
//#endregion

@Component({
    selector: 'game',
    styleUrls: ['game.component.scss'],
    template: `
    <div class="game">
      <div class="game_list">
        <div *ngIf="!((games$ | async)?.length)">
            No games, add one to get started.
        </div>
        <game-list
            [game]="games$">
        </game-list>
      </div>
    </div>
  `
})
export class GameComponent implements OnInit, OnDestroy {
    games$: Observable<any[]>;

    constructor(private store: Store<fromStore.TableTennisState>) {}

    ngOnInit() {
        this.games$ = this.store.select<any[]>(fromStore.getUsersList);
        this.store.dispatch(new fromStore.LoadUsers());
        // console.log(`this.users$`);
        // console.log(this.users$);
    }

    ngOnDestroy() {}
}
