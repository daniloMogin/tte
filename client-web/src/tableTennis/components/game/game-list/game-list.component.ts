//#region Imports
import {
    Component,
    ChangeDetectionStrategy,
    Input,
    OnInit,
    ViewChild
} from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
//#endregion

@Component({
    selector: 'game-list',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: 'game-list.component.html'
})
export class GameListComponent implements OnInit {
    @Input()
    game: any;
    @ViewChild(MatPaginator)
    paginator: MatPaginator;
    @ViewChild(MatSort)
    sort: MatSort;
    displayedColumns: string[] = ['name'];
    dataSource;

    ngOnInit(): void {
        this.game.forEach(data => {
            if (data.length > 0) {
                this.dataSource = new MatTableDataSource<any>(data);
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            }
        });
    }

    applyFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    getProfile(game) {
        console.log(` ========= game ========= `);
        console.log(game);
    }
}
