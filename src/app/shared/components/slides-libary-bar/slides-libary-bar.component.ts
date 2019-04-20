import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { Slide } from 'src/app/shared/interfaces/slide';
import { slidesLibaryEntities } from 'src/app/modules/dashboard/components/presentation-creator/store/selectors/slide-libary.selectors';
import { FileUploader } from '../../models/file-uploader';

@Component({
    selector: 'dd-slides-libary-bar',
    templateUrl: './slides-libary-bar.component.html',
    styleUrls: [ './slides-libary-bar.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlidesLibaryBarComponent extends FileUploader implements OnInit {

    public slidesInLibaryEntities$: Observable<Slide[]>;

    constructor(store: Store<AppState>) {
        super(store);
    }

    ngOnInit() {
        this.initSlidesInLibaryEntities();
    }

    private initSlidesInLibaryEntities(): void {
        this.slidesInLibaryEntities$ = this.store.pipe(select(slidesLibaryEntities));
    }
}
