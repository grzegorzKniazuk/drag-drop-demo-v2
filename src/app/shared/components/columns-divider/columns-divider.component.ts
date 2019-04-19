import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DividerSiblings } from '../../interfaces/divider-siblings';
import { Droppable } from '../../models/droppable';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { ColumnTitleComponent } from '../column-title/column-title.component';
import { MatDialog } from '@angular/material';
import { filter, first, withLatestFrom } from 'rxjs/operators';
import { selectColumnsEntities } from 'src/app/modules/dashboard/components/presentation-creator/store/selectors/column.selectors';
import { Column } from '../../interfaces/column';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
    selector: 'dd-columns-divider',
    templateUrl: './columns-divider.component.html',
    styleUrls: [ './columns-divider.component.scss' ],
})
export class ColumnsDividerComponent extends Droppable implements OnInit, OnDestroy {

    @Input() public dividerSibilings: DividerSiblings;

    constructor(
        private matDialog: MatDialog,
        store: Store<AppState>,
    ) {
        super(store);
    }

    ngOnInit() {
        // console.log(this.dividerSibilings);
        this.watchOnMoveSlideStart();
    }

    ngOnDestroy() {
    }

    public dropOnDivider(event: DragEvent): void {
        event.stopImmediatePropagation();

        const droppedSlideId = +event.dataTransfer.getData('string');
        console.log(droppedSlideId);

        this.matDialog.open(ColumnTitleComponent, {
            disableClose: true,
            hasBackdrop: true,
        }).afterClosed().pipe(
            first(),
            filter((columnTitle: string) => !!columnTitle),
            withLatestFrom(this.store.pipe(select(selectColumnsEntities))),
        ).subscribe(([ columTitle, columns ]: [ string, Column[] ]) => {

        });
    }
}
