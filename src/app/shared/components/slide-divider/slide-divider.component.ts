import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Droppable } from '../../models/droppable';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { SlideMove } from '../../interfaces/slideMove';
import { selectSlideFromLibaryById } from '../../../modules/dashboard/components/presentation-creator/store/selectors/slide-libary.selectors';
import { selectColumnByID } from '../../../modules/dashboard/components/presentation-creator/store/selectors/column.selectors';
import { first, withLatestFrom } from 'rxjs/operators';
import { Slide } from '../../interfaces/slide';
import { Column } from '../../interfaces/column';
import { DeleteSlidesFromLibary } from '../../../modules/dashboard/components/presentation-creator/store/actions/slide-libary.actions';
import { UpdateColumn } from '../../../modules/dashboard/components/presentation-creator/store/actions/column.actions';

@Component({
    selector: 'dd-slide-divider',
    templateUrl: './slide-divider.component.html',
    styleUrls: [ './slide-divider.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideDividerComponent extends Droppable implements OnInit {

    @Input() public columnID: number;
    @Input() public dividerSibilings: { topID: number, bottomID: number };

    constructor(
        private store: Store<AppState>,
    ) {
        super();
    }

    public ngOnInit(): void {
        console.log(this.dividerSibilings);
    }

    public onDrop(event: DragEvent): void {
        event.stopImmediatePropagation();
        this.isElementOnDragOver = false;

        const slideMove: SlideMove = JSON.parse(event.dataTransfer.getData('string'));

        if (slideMove.columnID === undefined) { // jesli slajd przeniesiony z biblioteki
            this.store.pipe(
                select(selectSlideFromLibaryById(slideMove.slideID)),
                withLatestFrom(this.store.pipe(select(selectColumnByID(this.columnID)))),
                first(),
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
        }
    }
}
