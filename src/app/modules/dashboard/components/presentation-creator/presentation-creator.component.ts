import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { amountOfSlidesInLibary } from 'src/app/modules/dashboard/components/presentation-creator/store/selectors/presentation-creator.selectors';

@AutoUnsubscribe()
@Component({
    selector: 'dd-presentation-creator',
    templateUrl: './presentation-creator.component.html',
    styleUrls: [ './presentation-creator.component.scss' ],
})
export class PresentationCreatorComponent implements OnInit, OnDestroy {

    public slidesInLibaryAmount$: Observable<number>;

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
        this.slidesInLibaryAmount$ = this.store.pipe(select(amountOfSlidesInLibary));
    }
}
