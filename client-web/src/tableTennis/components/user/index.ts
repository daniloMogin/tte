import { LoginComponent } from './login/login.component';
import { UserProfile } from './user-profile/user-profile.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserItemComponent } from './user-item/user.component';

export const userComponents: any[] = [
    LoginComponent,
    UserProfile,
    UserListComponent,
    UserItemComponent
];

export * from './login/login.component';
export * from './user-profile/user-profile.component';
export * from './user-list/user-list.component';
export * from './user-item/user.component';
