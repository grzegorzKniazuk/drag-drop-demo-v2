import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { amountOfSlidesInLibary } from 'src/app/modules/dashboard/components/presentation-creator/store/selectors/slide-libary.selectors';
import { amountOfPresentationColumns } from './store/selectors/column.selectors';

@AutoUnsubscribe()
@Component({
    selector: 'dd-presentation-creator',
    templateUrl: './presentation-creator.component.html',
    styleUrls: [ './presentation-creator.component.scss' ],
})
export class PresentationCreatorComponent implements OnInit, OnDestroy {

    public slidesInLibaryAmount$: Observable<number>;
    public amountOfPresentationColumns$: Observable<number>;

    constructor(
        private store: Store<AppState>,
    ) {
    }

    ngOnInit() {
        this.initObservables();
    }

    ngOnDestroy() {
    }

    private initObservables(): void {
        this.slidesInLibaryAmount$ = this.store.pipe(select(amountOfSlidesInLibary));
        this.amountOfPresentationColumns$ = this.store.pipe(select(amountOfPresentationColumns));
    }
}
