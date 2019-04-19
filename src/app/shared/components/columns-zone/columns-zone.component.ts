import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { amountOfPresentationColumns, selectColumnsEntities, selectMoveSlideState } from 'src/app/modules/dashboard/components/presentation-creator/store/selectors/column.selectors';
import { Droppable } from '../../models/droppable';
import { filter, first, withLatestFrom } from 'rxjs/operators';
import { AddColumn, MoveSlideEnd } from '../../../modules/dashboard/components/presentation-creator/store/actions/column.actions';
import { MatDialog } from '@angular/material';
import { ColumnTitleComponent } from '../column-title/column-title.component';
import { Column } from '../../interfaces/column';
import { selectSlideFromLibaryById } from '../../../modules/dashboard/components/presentation-creator/store/selectors/slide-libary.selectors';
import { Slide } from '../../interfaces/slide';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
    selector: 'dd-columns-zone',
    templateUrl: './columns-zone.component.html',
    styleUrls: [ './columns-zone.component.scss' ],
})
export class ColumnsZoneComponent extends Droppable implements OnInit, OnDestroy {

    public amountOfPresentationColumns$: Observable<number>;
    public columnsEntities$: Observable<Column[]>;

    constructor(
        private matDialog: MatDialog,
        store: Store<AppState>,
    ) {
        super(store);
    }

    ngOnInit() {
        this.initAmountOfPresentationColumns();
        this.initColumnEntities();
        this.watchOnMoveSlideStart();
    }

    ngOnDestroy() {
    }

    private initAmountOfPresentationColumns(): void {
        this.amountOfPresentationColumns$ = this.store.pipe(select(amountOfPresentationColumns));
    }

    private initColumnEntities(): void {
        this.columnsEntities$ = this.store.pipe(select(selectColumnsEntities));
    }

    private addSectionOnDrop(event: DragEvent): void {
        event.stopImmediatePropagation();

        this.matDialog.open(ColumnTitleComponent, {
            disableClose: true,
            hasBackdrop: true,
        }).afterClosed().pipe(
            first(),
            filter((columnTitle: string) => !!columnTitle),
            withLatestFrom(
                this.store.pipe(select(selectSlideFromLibaryById(this.slideMoveStartID))),
                this.store.pipe(select(amountOfPresentationColumns)),
            ))
        .subscribe(([ columnTitle, droppedSlide, numberOfColumns ]: [ string, Slide, number ]) => {
            this.store.dispatch(new AddColumn({
                column: {
                    id: numberOfColumns,
                    title: columnTitle,
                    slides: [ droppedSlide ],
                },
            }));
        });
    }

}
