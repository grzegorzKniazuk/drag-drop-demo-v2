import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Slide } from 'src/app/shared/interfaces/slide';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { Droppable } from '../../models/droppable';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
    selector: 'dd-slide-thumbnail',
    templateUrl: './slide-thumbnail.component.html',
    styleUrls: [ './slide-thumbnail.component.scss' ],
})
export class SlideThumbnailComponent extends Droppable implements OnInit, OnDestroy {

    @Input() public columnID: number;
    @Input() public slide: Slide;

    constructor(
        store: Store<AppState>,
    ) {
        super(store);
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    public dragStart(event: DragEvent): void {
        event.dataTransfer.setData('string', JSON.stringify({
            columnID: this.columnID,
            slideID: this.slide.id,
        }));
    }

    public onDrop(event: DragEvent): void {
        event.stopImmediatePropagation();
    }
}
