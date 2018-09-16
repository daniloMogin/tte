//#region Imports
import {
    Component,
    ChangeDetectionStrategy,
    OnInit,
    Output,
    EventEmitter
} from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { IUser } from '../../../models/user.model';
import { Store } from '@ngrx/store';

import * as fromStore from '../../../store';
import * as fromRoot from '../../../../app/store';
import { tap } from 'rxjs/operators';
//#endregion

@Component({
    selector: 'user-profile',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'user-profile.component.html',
    styleUrls: ['user-profile.component.scss']
})
export class UserProfile implements OnInit {
    user$: Observable<IUser>;
    private routeParam;
    userasd;
    userProfileForm;

    @Output() editUser = new EventEmitter<IUser>();

    constructor(
        private store: Store<fromStore.TableTennisState>,
        private fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.user$ = this.store.select<any>(fromStore.getSelectedUser).pipe(
            tap((user: IUser = null) => {})
        );
        console.log(`this.user$`);
        console.log(this.user$);
        this.store.select<any>(fromStore.getSelectedUser).subscribe(data => {
            this.userasd = data;
            this.createUserFrofileForm();
        })
        this.store.select<any>(fromRoot.getRouterState).subscribe(data => {
            this.routeParam = data;
        });
        this.store.dispatch(
            new fromStore.LoadUserById(this.routeParam.state.params.userId)
        );

    }

    createUserFrofileForm() {
        console.log(`this.userasd`);
        console.log(this.userasd);
        
        this.userProfileForm = this.fb.group({
            name: [this.userasd.name, Validators.required],
            lastname: [this.userasd.lastname, Validators.required],
            username: ['', Validators.required],
            email: [this.userasd.email, Validators.required],
            DoB: [this.userasd.DoB, Validators.required],
            additionalInfo: [this.userasd.additionalInfo, Validators.required],
            winRatio: ['', Validators.required],
            roles: this.fb.array([this.fb.control('')]),
            games: this.fb.array([this.fb.control('')])
        });
    }

    editUserProfile(form: FormGroup) {
        const { value, valid } = form;
        if (valid) {
            this.editUser.emit(value);
        }
    }

    get roles() {
        return this.userProfileForm.get('roles') as FormArray;
    }

    get games() {
        return this.userProfileForm.get('games') as FormArray;
    }
}
