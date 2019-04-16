import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { amountOfPresentationColumns } from 'src/app/modules/dashboard/components/presentation-creator/store/selectors/column.selectors';

@Component({
    selector: 'dd-columns-zone',
    templateUrl: './columns-zone.component.html',
    styleUrls: [ './columns-zone.component.scss' ],
})
export class ColumnsZoneComponent implements OnInit {

    public amountOfPresentationColumns$: Observable<number>;

    constructor(
        private store: Store<AppState>,
        ) {
    }

    ngOnInit() {
        this.initAmountOfPresentationColumns();
    }

    private initAmountOfPresentationColumns(): void {
        this.amountOfPresentationColumns$ = this.store.pipe(select(amountOfPresentationColumns));
    }

}
