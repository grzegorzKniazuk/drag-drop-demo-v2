import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Slide } from '../../interfaces/slide';
import { Droppable } from '../../models/droppable';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
    selector: 'dd-column',
    templateUrl: './column.component.html',
    styleUrls: [ './column.component.scss' ],
})
export class ColumnComponent extends Droppable implements OnInit, OnDestroy {

    @Input() public id: number;
    @Input() public title: string;
    @Input() public slides: Slide[];

    constructor(
        store: Store<AppState>
    ) {
        super(store);
    }

    ngOnInit() {
        this.watchOnMoveSlideStart();
    }

    ngOnDestroy() {
    }

    public onDrop(event: DragEvent): void {
        event.stopImmediatePropagation();

        console.log(event);
    }
}
