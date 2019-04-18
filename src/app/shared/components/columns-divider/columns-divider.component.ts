import { Component, Input, OnInit } from '@angular/core';
import { DividerSiblings } from '../../interfaces/divider-siblings';
import { Droppable } from '../../models/droppable';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { AddColumn } from '../../../modules/dashboard/components/presentation-creator/store/actions/column.actions';
import { ColumnTitleComponent } from '../column-title/column-title.component';
import { MatDialog } from '@angular/material';
import { filter, first, withLatestFrom } from 'rxjs/operators';
import { selectSlideById } from '../../../modules/dashboard/components/presentation-creator/store/selectors/slide-libary.selectors';
import { Slide } from '../../interfaces/slide';

@Component({
    selector: 'dd-columns-divider',
    templateUrl: './columns-divider.component.html',
    styleUrls: [ './columns-divider.component.scss' ],
})
export class ColumnsDividerComponent extends Droppable implements OnInit {

    @Input() public dividerSibilings: DividerSiblings;

    constructor(
        private matDialog: MatDialog,
        private store: Store<AppState>,
    ) {
        super();
    }

    ngOnInit() {
        console.log(this.dividerSibilings);
    }

    public dropOnDivider(event: DragEvent): void {
        const droppedSlideId = +event.dataTransfer.getData('string');

        this.matDialog.open(ColumnTitleComponent, {
            disableClose: true,
            hasBackdrop: true,
        }).afterClosed().pipe(
            first(),
            filter((columnTitle: string) => !!columnTitle),
            withLatestFrom(this.store.pipe(select(selectSlideById(droppedSlideId)))),
        ).subscribe(([ columTitle, droppedSlide ]: [ string, Slide ]) => {
            this.store.dispatch(new AddColumn({
                column: {
                    id: this.dividerSibilings.rightSideElementId,
                    title: columTitle,
                    slides: [ droppedSlide ],
                },
            }));
        });
    }
}
