import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../../store';
import { ActivatedRoute } from '@angular/router';
import { Slide } from '../../../../../shared/interfaces/slide';
import { selectColumnsState } from '../store/selectors/column.selectors';
import { first } from 'rxjs/operators';
import { Column } from '../../../../../shared/interfaces/column';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@AutoUnsubscribe()
@Component({
    selector: 'dd-edit-slide',
    templateUrl: './edit-slide.component.html',
    styleUrls: [ './edit-slide.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditSlideComponent implements OnInit, OnDestroy {

    @ViewChild('canvasElement') private canvasElement: ElementRef;
    private slide: Slide;
    private columnID: number;
    private slideID: number;
    public backgroundImageStyle: SafeStyle;

    constructor(
        private activatedRoute: ActivatedRoute,
        private store: Store<AppState>,
        private changeDetectorRef: ChangeDetectorRef,
        private domSanitizer: DomSanitizer,
    ) {
    }

    ngOnInit() {
        this.getRouteParams();
    }

    ngOnDestroy() {
    }

    private getRouteParams(): void {
        this.activatedRoute.params.pipe(
            first(),
        ).subscribe((params: { columnid: number, slideid: number }) => {
            this.columnID = params.columnid;
            this.slideID = params.slideid;

            this.getSlideFromStore();
        });
    }

    private getSlideFromStore(): void {
        this.store.pipe(
            select(selectColumnsState), // pobierz wszystkie kolumny
            first(),
        ).subscribe((columns: Column[]) => {
            // pobierz kolumne w ktorej znajduje sie slajd z docelowym id
            const column: Column = columns.find((column: Column) => {
                return column.id == this.columnID;
            });

            // pobierz slajd do edycji
            this.getSlideToEdit(column).then((slide: Slide) => {
              this.getBackgroundImageStyle(slide);
            });
        });
    }

    private getSlideToEdit(column: Column): Promise<Slide> {
        return new Promise<Slide>((resolve, reject) => {
            column.slides.forEach((slide: Slide) => {
                if (slide.id == this.slideID) {
                    resolve(slide);
                    this.slide = slide;
                }
            });
        });
    }

    private getBackgroundImageStyle(slide: Slide) {
        this.backgroundImageStyle = this.domSanitizer.bypassSecurityTrustStyle(`background-image: url(${slide.imageData})`);
        this.changeDetectorRef.detectChanges();
    }
}
