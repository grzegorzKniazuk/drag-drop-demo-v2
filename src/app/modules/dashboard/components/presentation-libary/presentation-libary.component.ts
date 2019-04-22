import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { amountOfPresentationsInLibary } from './store/selectors/presentation-list.selectors';

@Component({
    selector: 'dd-presentation-libary',
    templateUrl: './presentation-libary.component.html',
    styleUrls: [ './presentation-libary.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationLibaryComponent implements OnInit {

    public amountOfPresentationsInLibary$: Observable<number>;

    constructor(
        private store: Store<AppState>,
    ) {
    }

    ngOnInit() {
        this.initAmountOfPresentationsInLibary();
    }

    private initAmountOfPresentationsInLibary(): void {
        this.amountOfPresentationsInLibary$ = this.store.pipe(select(amountOfPresentationsInLibary));
    }
}
