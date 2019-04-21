import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { Slide } from 'src/app/shared/interfaces/slide';
import { slidesLibaryEntities } from 'src/app/modules/dashboard/components/presentation-creator/store/selectors/slide-libary.selectors';
import { FileUploader } from '../../models/file-uploader';
import { AddSlidesToLibary } from '../../../modules/dashboard/components/presentation-creator/store/actions/slide-libary.actions';

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
        this.initDemoSlides();
        this.initSlidesInLibaryEntities();
    }

    private initSlidesInLibaryEntities(): void {
        this.slidesInLibaryEntities$ = this.store.pipe(select(slidesLibaryEntities));
    }

    private initDemoSlides(): void {
        const slides: Slide[] = [];

        slides.push({
            id: Math.floor((Math.random() * 10000000) + 1),
            columnId: null,
            imageData: this.slide1,
            actions: [],
        });

        slides.push({
            id: Math.floor((Math.random() * 10000000) + 1),
            columnId: null,
            imageData: this.slide2,
            actions: [],
        });

        slides.push({
            id: Math.floor((Math.random() * 10000000) + 1),
            columnId: null,
            imageData: this.slide3,
            actions: [],
        });

        slides.push({
            id: Math.floor((Math.random() * 10000000) + 1),
            columnId: null,
            imageData: this.slide4,
            actions: [],
        });

        slides.push({
            id: Math.floor((Math.random() * 10000000) + 1),
            columnId: null,
            imageData: this.slide5,
            actions: [],
        });

        this.store.dispatch(new AddSlidesToLibary({ slides }));
    }
}
