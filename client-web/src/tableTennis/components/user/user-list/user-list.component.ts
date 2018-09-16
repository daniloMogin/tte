//#region Imports
import {
    Component,
    ChangeDetectionStrategy,
    Input,
    OnInit,
    ViewChild
} from '@angular/core';
import { IUser } from '../../../models/user.model';
import { transition, style, animate, trigger } from '@angular/animations';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
//#endregion
export const DROP_ANIMATION = trigger('drop', [
    transition(':enter', [
        style({ transform: 'translateY(-200px)', opacity: 0 }),
        animate(
            '300ms cubic-bezier(1.000, 0.000, 0.000, 1.000)',
            style({ transform: 'translateY(0)', opacity: 1 })
        )
    ]),
    transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate(
            '200ms cubic-bezier(1.000, 0.000, 0.000, 1.000)',
            style({ transform: 'translateY(-200px)', opacity: 0 })
        )
    ])
]);

@Component({
    selector: 'user-list',
    animations: [DROP_ANIMATION],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'user-list.component.html'
})
export class UserListComponent implements OnInit {
    @Input()
    user: any;
    @ViewChild(MatPaginator)
    paginator: MatPaginator;
    @ViewChild(MatSort)
    sort: MatSort;
    displayedColumns: string[] = ['name', 'username', 'games', 'winRatio', 'profile'];
    dataSource;

    ngOnInit(): void {
        this.user.forEach(data => {
            if (data.length > 0) {
                this.dataSource = new MatTableDataSource<IUser>(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }
        });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getProfile(user) {
        console.log(` ========= user ========= `);
        console.log(user);
    }
}
