import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { columnsAmount } from 'src/app/modules/dashboard/components/presentation-creator/store/selectors/column.selectors';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/store';

@AutoUnsubscribe()
@Component({
    selector: 'dd-presentation-creator',
    templateUrl: './presentation-creator.component.html',
    styleUrls: [ './presentation-creator.component.scss' ],
})
export class PresentationCreatorComponent implements OnInit, OnDestroy {

    public columnsAmount$: Observable<number>;

    constructor(
        private store: Store<AppState>
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
