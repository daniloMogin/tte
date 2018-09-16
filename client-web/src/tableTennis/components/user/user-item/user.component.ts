import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'user-item',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['user.component.scss'],
    template: `
    <div class="user">
      <a [routerLink]="['user-profile', user._id]">
        <h4>{{ user | json }}</h4>
        <button type="button" class="btn btn__ok">
          View user
        </button>
      </a>
    </div>
  `
})
export class UserItemComponent {
    @Input()
    user: any;
}
