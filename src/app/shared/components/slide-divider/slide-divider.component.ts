import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Droppable } from '../../models/droppable';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { SlideMove } from '../../interfaces/slideMove';

@Component({
    selector: 'dd-slide-divider',
    templateUrl: './slide-divider.component.html',
    styleUrls: [ './slide-divider.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SlideDividerComponent extends Droppable {

    constructor(
        private store: Store<AppState>,
    ) {
        super();
    }

    public onDrop(event: DragEvent): void {
        event.stopImmediatePropagation();
        this.isElementOnDragOver = false;

        const slideMove: SlideMove = JSON.parse(event.dataTransfer.getData('string'));
        console.log(slideMove);
    }
}
