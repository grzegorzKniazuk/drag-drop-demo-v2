import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Slide } from '../../interfaces/slide';
import { Droppable } from '../../models/droppable';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { SlideMove } from '../../interfaces/slideMove';
import { selectSlideFromLibaryById } from '../../../modules/dashboard/components/presentation-creator/store/selectors/slide-libary.selectors';
import { first } from 'rxjs/operators';
import { UpdateColumn } from '../../../modules/dashboard/components/presentation-creator/store/actions/column.actions';

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
    private slideMove: SlideMove;

    constructor(
        store: Store<AppState>,
    ) {
        super(store);
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    public onDrop(event: DragEvent): void {
        event.stopImmediatePropagation();

        this.slideMove = JSON.parse(event.dataTransfer.getData('string'));
        console.log(this.slideMove);
        if (!this.slideMove.columnID) { // jesli drag n drop z biblioteki
            this.store.pipe(
                select(selectSlideFromLibaryById(this.slideMove.slideID)),
                first(),
            ).subscribe((droppedSlide: Slide) => {
                console.log(droppedSlide);
                this.store.dispatch(new UpdateColumn({
                    column: {
                        id: this.id,
                        changes: {
                            slides: [ ...this.slides, droppedSlide ],
                        }
                    },
                }));
            });
        }
    }
}
