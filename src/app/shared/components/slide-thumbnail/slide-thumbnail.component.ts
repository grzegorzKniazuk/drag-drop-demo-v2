import { ChangeDetectionStrategy, Component, Input, OnDestroy } from '@angular/core';
import { Slide } from 'src/app/shared/interfaces/slide';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { Droppable } from '../../models/droppable';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { SlideMove } from '../../interfaces/slideMove';
import { selectColumnByID } from '../../../modules/dashboard/components/presentation-creator/store/selectors/column.selectors';
import { first, withLatestFrom } from 'rxjs/operators';
import { Column } from '../../interfaces/column';
import { UpdateColumn } from '../../../modules/dashboard/components/presentation-creator/store/actions/column.actions';
import { selectSlideFromLibaryById } from '../../../modules/dashboard/components/presentation-creator/store/selectors/slide-libary.selectors';
import { AddSlidesToLibary, DeleteSlidesFromLibary } from '../../../modules/dashboard/components/presentation-creator/store/actions/slide-libary.actions';

@AutoUnsubscribe()
@Component({
    selector: 'dd-slide-thumbnail',
    templateUrl: './slide-thumbnail.component.html',
    styleUrls: [ './slide-thumbnail.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideThumbnailComponent extends Droppable implements OnDestroy {

    @Input() public columnID: number;
    @Input() public slide: Slide;

    constructor(
        private store: Store<AppState>,
    ) {
        super();
    }

    ngOnDestroy() {
    }

    public dragStart(event: DragEvent): void {
        event.stopImmediatePropagation();

        event.dataTransfer.setData('string', JSON.stringify({
            columnID: this.columnID,
            slideID: this.slide.id,
        }));
    }

    public onDrop(event: DragEvent): void {
        event.stopImmediatePropagation();

        const slideMove: SlideMove = JSON.parse(event.dataTransfer.getData('string'));

        if (slideMove.columnID === this.columnID && slideMove.columnID !== undefined) { // jesli slajdy znajduja sie w tej samej kolumnie
            this.store.pipe(
                select(selectColumnByID(this.columnID)), // pobierz docelowa kolumne ze store'a
                first(),
            ).subscribe((column: Column) => {

                // zamien slajdy pozycjami w tej samej kolumnie
                const slideToMove = column.slides.find((slide: Slide) => {
                    return slide.id === slideMove.slideID;
                });
                const slideToMoveIndexInColumn = column.slides.indexOf(slideToMove);

                const slideTarget = column.slides.find((slide: Slide) => {
                    return slide.id === this.slide.id;
                });
                const slideTargetIndexInColumn = column.slides.indexOf(slideTarget);

                column.slides[slideTargetIndexInColumn] = slideToMove;
                column.slides[slideToMoveIndexInColumn] = slideTarget;

                // aktualizuj store'a
                this.store.dispatch(new UpdateColumn({
                    column: {
                        id: this.columnID,
                        changes: {
                            slides: column.slides,
                        },
                    },
                }));
            });
        } else if (slideMove.columnID >= 0 && slideMove.columnID !== this.columnID) { // slajdy znajduja sie w innych kolumnach
            this.store.pipe(
                select(selectColumnByID(slideMove.columnID)), // pobierz wyjsciowa kolumne ze store'a
                withLatestFrom(this.store.pipe(select(selectColumnByID(this.columnID)))), // pobierz docelowa kolumne ze store'a
                first(),
            ).subscribe(([ sourceColumn, targetcColumn ]: [ Column, Column ]) => {

                // ustal pozycje slajdow w kolumnach
                const slideToMove = sourceColumn.slides.find((slide: Slide) => {
                    return slide.id === slideMove.slideID;
                });

                const slideToMoveIndexInColumn = sourceColumn.slides.indexOf(slideToMove);

                const slideTarget = targetcColumn.slides.find((slide: Slide) => {
                    return slide.id === this.slide.id;
                });
                const slideTargetIndexInColumn = targetcColumn.slides.indexOf(slideTarget);

                // zamien miejscami
                targetcColumn.slides[slideTargetIndexInColumn] = slideToMove;
                sourceColumn.slides[slideToMoveIndexInColumn] = slideTarget;

                // aktualizuj store'a
                this.store.dispatch(new UpdateColumn({ // wyjsciowa kolumna
                    column: {
                        id: slideMove.columnID,
                        changes: {
                            slides: sourceColumn.slides,
                        },
                    },
                }));

                this.store.dispatch(new UpdateColumn({ // docelowa kolumna
                    column: {
                        id: this.columnID,
                        changes: {
                            slides: targetcColumn.slides,
                        },
                    },
                }));
            });
        } else if (slideMove.columnID === undefined && this.slide.columnId >= 0 && this.columnID >= 0) { // drag n drop z nierozmieszczonych slajdow na slajd w kolumnie
            this.store.pipe(
                select(selectColumnByID(this.columnID)), // pobierz docelowa kolumne
                withLatestFrom(this.store.pipe(select(selectSlideFromLibaryById(slideMove.slideID)))), // pobierz slajd z biblioteki
                first(),
            ).subscribe(([ targetColumn, slideFromLibary ]: [ Column, Slide ]) => {
                // ustal pozycje docelowego slajdu w kolumnie
                const slideTarget = targetColumn.slides.find((slide: Slide) => {
                    return slide.id === this.slide.id;
                });
                const slideTargetIndexInColumn = targetColumn.slides.indexOf(slideTarget);

                targetColumn.slides[slideTargetIndexInColumn] = slideFromLibary;

                // aktualizuj store'a
                // dodaj przeniesiony slajd do kolumny
                this.store.dispatch(new UpdateColumn({
                    column: {
                        id: this.columnID,
                        changes: {
                            slides: targetColumn.slides,
                        },
                    },
                }));

                // usun przeniesiony slajd z bibloteki
                this.store.dispatch(new DeleteSlidesFromLibary({ ids: [ slideMove.slideID ] }));

                // dodaj zamieniony slajd do bibloteki
                this.store.dispatch(new AddSlidesToLibary({
                    slides: [ this.slide ],
                }));
            });
        }
    }
}
