import { select, Store } from '@ngrx/store';
import { AppState } from '../../store';
import { selectMoveSlideState } from '../../modules/dashboard/components/presentation-creator/store/selectors/column.selectors';
import { SlideMove } from '../interfaces/slideMove';
import { filter } from 'rxjs/operators';

export abstract class Droppable {

    protected slideMoveStartID: number;
    protected columnMoveStartID: number;
    protected slideMoveEndID: number;
    protected columnMoveEndID: number;
    protected dropOnDivider: boolean;

    protected constructor(
        protected store: Store<AppState>,
    ) {
    }

    public allowDrop(event: DragEvent): void {
        event.preventDefault();
        event.stopImmediatePropagation();
    }

    protected watchOnMoveSlideStart(): void {
        this.store.pipe(
            select(selectMoveSlideState),
            filter((slideToMove: SlideMove) => !!slideToMove),
        )
        .subscribe((slideToMove: SlideMove) => {
            this.slideMoveStartID = slideToMove.start.slideID;
            this.columnMoveStartID = slideToMove.start.columnID;
            this.slideMoveEndID = slideToMove.end.slideID;
            this.columnMoveEndID = slideToMove.end.columnID;
            this.dropOnDivider = slideToMove.dropOnDivider;
        });
    }
}
