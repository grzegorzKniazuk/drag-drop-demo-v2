import { Store } from '@ngrx/store';
import { AppState } from '../../store';

export abstract class Droppable {
    public isElementOnDragOver: boolean;

    protected constructor(
        protected store: Store<AppState>,
    ) {
    }

    public allowDrop(event: DragEvent): void {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.isElementOnDragOver = true;
    }

    public onDragLeave(): void {
        this.isElementOnDragOver = false;
    }
}
