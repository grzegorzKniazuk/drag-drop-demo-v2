import { Store } from '@ngrx/store';
import { AppState } from '../../store';

export abstract class Droppable {

    protected constructor(
        protected store: Store<AppState>,
    ) {
    }

    public allowDrop(event: DragEvent): void {
        event.preventDefault();
        event.stopImmediatePropagation();
    }
}
