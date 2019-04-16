import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { Slide } from 'src/app/shared/interfaces/slide';
import { slidesLibaryEntities } from 'src/app/modules/dashboard/components/presentation-creator/store/selectors/slide-libary.selectors';

@Component({
    selector: 'dd-slides-libary-bar',
    templateUrl: './slides-libary-bar.component.html',
    styleUrls: [ './slides-libary-bar.component.scss' ],
})
export class SlidesLibaryBarComponent implements OnInit {

    public slidesInLibaryEntities$: Observable<Slide[]>;

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.initSlidesInLibaryEntities();
    }

    private initSlidesInLibaryEntities(): void {
        this.slidesInLibaryEntities$ = this.store.pipe(select(slidesLibaryEntities));
    }

}
