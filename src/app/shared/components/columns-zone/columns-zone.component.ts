import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { amountOfPresentationColumns, columnsEntities } from 'src/app/modules/dashboard/components/presentation-creator/store/selectors/column.selectors';
import { Droppable } from '../../models/droppable';
import { filter, first, withLatestFrom } from 'rxjs/operators';
import { AddColumn } from '../../../modules/dashboard/components/presentation-creator/store/actions/column.actions';
import { MatDialog } from '@angular/material';
import { ColumnTitleComponent } from '../column-title/column-title.component';
import { Column } from '../../interfaces/column';
import { selectSlideById } from '../../../modules/dashboard/components/presentation-creator/store/selectors/slide-libary.selectors';
import { Slide } from '../../interfaces/slide';

@Component({
    selector: 'dd-columns-zone',
    templateUrl: './columns-zone.component.html',
    styleUrls: [ './columns-zone.component.scss' ],
})
export class ColumnsZoneComponent extends Droppable implements OnInit {

    public amountOfPresentationColumns$: Observable<number>;
    public columnsEntities$: Observable<Column[]>;

    constructor(
        private matDialog: MatDialog,
        private store: Store<AppState>,
    ) {
        super();
    }

    ngOnInit() {
        this.initAmountOfPresentationColumns();
        this.initColumnEntities();
    }

    private initAmountOfPresentationColumns(): void {
        this.amountOfPresentationColumns$ = this.store.pipe(select(amountOfPresentationColumns));
    }

    private initColumnEntities(): void {
        this.columnsEntities$ = this.store.pipe(select(columnsEntities));
    }

    private addSectionOnDrop(event: DragEvent): void {
        const droppedSlideId = +event.dataTransfer.getData('string');

        this.matDialog.open(ColumnTitleComponent, {
            disableClose: true,
            hasBackdrop: true,
        }).afterClosed().pipe(
            first(),
            filter((columnTitle: string) => !!columnTitle),
            withLatestFrom(this.store.pipe(select(selectSlideById(droppedSlideId))), this.store.pipe(select(amountOfPresentationColumns))),
        ).subscribe(([ columnTitle, slide, numberOfColumns ]: [ string, Slide, number ]) => {
            this.store.dispatch(new AddColumn({
                column: {
                    id: numberOfColumns,
                    title: columnTitle,
                    slides: [ slide ],
                },
            }));
        })
    }

}
