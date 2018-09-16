import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { IUser } from '../../../models/user.model';

@Component({
    selector: 'user-login',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.scss']
})
export class LoginComponent {
    
    @Output() login = new EventEmitter<IUser>();
    
    constructor(
        private fb: FormBuilder
    ) {}
    loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    onLogin(form: FormGroup) {
        const { value, valid } = form;
        if (valid) {
            this.login.emit(value);
        }
    }
}
