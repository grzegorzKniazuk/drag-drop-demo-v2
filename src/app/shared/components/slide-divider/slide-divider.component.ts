import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy } from '@angular/core';
import { Droppable } from '../../models/droppable';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { SlideMove } from '../../interfaces/slideMove';
import { selectSlideFromLibaryById } from '../../../modules/dashboard/components/presentation-creator/store/selectors/slide-libary.selectors';
import { selectColumnByID } from '../../../modules/dashboard/components/presentation-creator/store/selectors/column.selectors';
import { first, tap, withLatestFrom } from 'rxjs/operators';
import { Slide } from '../../interfaces/slide';
import { Column } from '../../interfaces/column';
import { DeleteSlidesFromLibary } from '../../../modules/dashboard/components/presentation-creator/store/actions/slide-libary.actions';
import { UpdateColumn } from '../../../modules/dashboard/components/presentation-creator/store/actions/column.actions';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
    selector: 'dd-slide-divider',
    templateUrl: './slide-divider.component.html',
    styleUrls: [ './slide-divider.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideDividerComponent extends Droppable implements OnDestroy {

    @Input() public columnID: number;
    @Input() public dividerSibilings: { topID: number, bottomID: number };

    constructor(
        private store: Store<AppState>,
        private changeDetectorRef: ChangeDetectorRef,
    ) {
        super();
    }

    ngOnDestroy() {
    }

    public onDrop(event: DragEvent): void {
        event.stopImmediatePropagation();

        const slideMove: SlideMove = JSON.parse(event.dataTransfer.getData('string'));

        if (slideMove.columnID === undefined) { // jesli slajd przeniesiony z biblioteki
            this.store.pipe(
                select(selectSlideFromLibaryById(slideMove.slideID)),
                withLatestFrom(this.store.pipe(select(selectColumnByID(this.columnID)))),
                first(),
                tap(() => {
                    this.isElementOnDragOver = false;
                    this.changeDetectorRef.detectChanges();
                }),
            ).subscribe(([ sourceSlide, targetColumn ]: [ Slide, Column ]) => {

                // usun slajd z bibloteki
                this.store.dispatch(new DeleteSlidesFromLibary({ ids: [ sourceSlide.id ] }));

                // aktualizuj columnID slajdu
                sourceSlide.columnId = this.columnID;

                // przygotuj slajdy w kolumnie
                const updatedSlideArray = [
                    ...targetColumn.slides.slice(0, this.dividerSibilings.topID + 1),
                    sourceSlide,
                    ...targetColumn.slides.slice(this.dividerSibilings.bottomID, targetColumn.slides.length),
                ];

                // aktualizuj slajdy w kolumnie
                this.store.dispatch(new UpdateColumn({
                    column: {
                        id: this.columnID,
                        changes: {
                            slides: updatedSlideArray,
                        },
                    },
                }));
            });
        } else if (slideMove.columnID === this.columnID && slideMove.slideID) { // jesli drag n drop w tej samej kolumnie
            this.store.pipe(
                select(selectColumnByID(this.columnID)),
                first(),
                tap(() => {
                    this.isElementOnDragOver = false;
                    this.changeDetectorRef.detectChanges();
                }),
            ).subscribe((column: Column) => {

                // wyszukanie slajdu do przesuniecia
                const slideToMove = column.slides.find((slide: Slide) => {
                    return slide.id === slideMove.slideID;
                });

                // wyciecie slajdu z tablicy
                column.slides = column.slides.filter((slide: Slide) => {
                    return slide.id !== slideMove.slideID;
                });

                // przygotowanie slajdow w kolumnie
                column.slides = [
                    ...column.slides.slice(0, this.dividerSibilings.topID + 1),
                    slideToMove,
                    ...column.slides.slice(this.dividerSibilings.bottomID, column.slides.length),
                ];

                // aktualizuj slajdy w kolumnie
                this.store.dispatch(new UpdateColumn({
                    column: {
                        id: this.columnID,
                        changes: {
                            slides: column.slides,
                        },
                    },
                }));
            });
        } else if (slideMove.columnID !== this.columnID && slideMove.slideID) { // jesli drag n drop ze zrodlem w innej kolumnie
            this.store.pipe(
                select(selectColumnByID(slideMove.columnID)), // poczatkowa kolumna
                withLatestFrom(this.store.pipe(select(selectColumnByID(this.columnID)))), // docelowa kolumna
                first(),
                tap(() => {
                    this.isElementOnDragOver = false;
                    this.changeDetectorRef.detectChanges();
                }),
            ).subscribe(([ sourceColumn, targetColumn ]: [ Column, Column ]) => {

                // wyszukanie slajdu do przeniesienia
                const slideToMove = sourceColumn.slides.find((slide: Slide) => {
                    return slide.id === slideMove.slideID;
                });

                // aktualizuj columnID w slajdzie do przeniesienia
                slideToMove.columnId = slideMove.columnID;

                // usun slajd z poczatkowej kolumny
                this.store.dispatch(new UpdateColumn({
                    column: {
                        id: slideMove.columnID,
                        changes: {
                            slides: [ ...sourceColumn.slides.filter((slide: Slide) => {
                                return slide.id !== slideMove.slideID;
                            }) ],
                        },
                    },
                }));

                // przygotuj tablice slajdow w docelowej kolumnie
                targetColumn.slides = [
                    ...targetColumn.slides.slice(0, this.dividerSibilings.topID + 1),
                    slideToMove,
                    ...targetColumn.slides.slice(this.dividerSibilings.bottomID, targetColumn.slides.length),
                ];

                // aktualizuj docelowa kolumne
                this.store.dispatch(new UpdateColumn({
                    column: {
                        id: this.columnID,
                        changes: {
                            slides: targetColumn.slides,
                        },
                    },
                }));
            });
        }
    }
}
