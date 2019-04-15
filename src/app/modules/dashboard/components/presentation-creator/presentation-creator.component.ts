import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppState } from 'src/app/store/base.reducers';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { columnsAmount } from 'src/app/store/selectors/columns.selectors';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
    selector: 'dd-presentation-creator',
    templateUrl: './presentation-creator.component.html',
    styleUrls: [ './presentation-creator.component.scss' ],
})
export class PresentationCreatorComponent implements OnInit, OnDestroy {

    public columnsAmount$: Observable<number>;

    constructor(
        private store: Store<AppState>,
    ) {
    }

    ngOnInit() {
        this.initColumnsAmount();
    }

    ngOnDestroy() {
    }

    private initColumnsAmount(): void {
        this.columnsAmount$ = this.store.pipe(select(columnsAmount));
    }
}
