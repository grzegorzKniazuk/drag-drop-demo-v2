import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Slide } from '../../interfaces/slide';
import { Droppable } from '../../models/droppable';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { SlideMove } from '../../interfaces/slideMove';
import { selectSlideFromLibaryById } from '../../../modules/dashboard/components/presentation-creator/store/selectors/slide-libary.selectors';
import { first } from 'rxjs/operators';
import { UpdateColumn } from '../../../modules/dashboard/components/presentation-creator/store/actions/column.actions';
import { DeleteSlidesFromLibary } from '../../../modules/dashboard/components/presentation-creator/store/actions/slide-libary.actions';
import { selectColumnByID } from '../../../modules/dashboard/components/presentation-creator/store/selectors/column.selectors';
import { Column } from '../../interfaces/column';

@AutoUnsubscribe()
@Component({
    selector: 'dd-column',
    templateUrl: './column.component.html',
    styleUrls: [ './column.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent extends Droppable implements OnInit, OnDestroy {

    @Input() public id: number;
    @Input() public title: string;
    @Input() public slides: Slide[];

    constructor(
        private store: Store<AppState>,
    ) {
        super();
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    public onDrop(event: DragEvent): void {
        event.stopImmediatePropagation();

        const slideMove: SlideMove = JSON.parse(event.dataTransfer.getData('string'));

        if (slideMove.columnID === this.id) { // jesli drag n drop w tej samej kolumnie
            this.store.pipe(
                select(selectColumnByID(this.id)), // pobierz kolumne
                first(),
            ).subscribe((column: Column) => {
                this.store.dispatch(new UpdateColumn({ // przesun slajd na koniec kolumny
                    column: {
                        id: this.id,
                        changes: {
                            slides: [
                                ...column.slides.filter((slide: Slide) => { // przefiltruj slajdy
                                    return slide.id !== slideMove.slideID;
                                }),
                                column.slides.find((slide: Slide) => { // przesun slajd
                                    return slide.id === slideMove.slideID;
                                }),
                            ],
                        },
                    },
                }));
            });
        } else if (slideMove.columnID === undefined && slideMove.slideID) { // jesli drag n drop z biblioteki
            this.store.pipe(
                select(selectSlideFromLibaryById(slideMove.slideID)),
                first(),
            ).subscribe((droppedSlide: Slide) => {
                this.store.dispatch(new UpdateColumn({
                    column: {
                        id: this.id,
                        changes: {
                            slides: [ ...this.slides, droppedSlide ],
                        },
                    },
                }));

                // usun slajd z biblioteki
                this.store.dispatch(new DeleteSlidesFromLibary({ ids: [ slideMove.slideID ] }));
            });
        } else if (slideMove.columnID >= 0 && slideMove.slideID) { // jesli drag n drop z innej kolumny
            this.store.pipe(
                select(selectColumnByID(slideMove.columnID)), // pobierz kolumne z ktorej nastapil drag n drop
                first(),
            ).subscribe((startColumn: Column) => {

                // znajdz w poprzedniej kolumnie slajd do przeniesienia
                const slideToMove = startColumn.slides.find((slide: Slide) => {
                    return slide.id === slideMove.slideID;
                });

                // przenies slajd
                this.store.dispatch(new UpdateColumn({
                    column: {
                        id: this.id,
                        changes: {
                            slides: [ ...this.slides, slideToMove ],
                        },
                    },
                }));

                // usun slajd z poprzedniej kolumny
                this.store.dispatch(new UpdateColumn({
                    column: {
                        id: slideMove.columnID,
                        changes: {
                            slides: startColumn.slides.filter((slide: Slide) => {
                                return slide.id !== slideMove.slideID;
                            }),
                        },
                    },
                }));
            });
        }
    }
}
