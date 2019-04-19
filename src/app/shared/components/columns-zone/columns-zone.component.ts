import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { amountOfPresentationColumns, selectColumnByID, selectColumnsState } from 'src/app/modules/dashboard/components/presentation-creator/store/selectors/column.selectors';
import { Droppable } from '../../models/droppable';
import { filter, first, withLatestFrom } from 'rxjs/operators';
import { AddColumn, UpdateColumn } from '../../../modules/dashboard/components/presentation-creator/store/actions/column.actions';
import { MatDialog } from '@angular/material';
import { ColumnTitleComponent } from '../column-title/column-title.component';
import { Column } from '../../interfaces/column';
import { selectSlideFromLibaryById } from '../../../modules/dashboard/components/presentation-creator/store/selectors/slide-libary.selectors';
import { Slide } from '../../interfaces/slide';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { SlideMove } from '../../interfaces/slideMove';
import { DeleteSlidesFromLibary } from '../../../modules/dashboard/components/presentation-creator/store/actions/slide-libary.actions';

@AutoUnsubscribe()
@Component({
    selector: 'dd-columns-zone',
    templateUrl: './columns-zone.component.html',
    styleUrls: [ './columns-zone.component.scss' ],
})
export class ColumnsZoneComponent extends Droppable implements OnInit, OnDestroy {

    public amountOfPresentationColumns$: Observable<number>;
    public columnsEntities$: Observable<Column[]>;
    private slideMove: SlideMove; // columnID, slideID

    constructor(
        private matDialog: MatDialog,
        store: Store<AppState>,
    ) {
        super(store);
    }

    ngOnInit() {
        this.initAmountOfPresentationColumns();
        this.initColumnEntities();
    }

    ngOnDestroy() {
    }

    private initAmountOfPresentationColumns(): void {
        this.amountOfPresentationColumns$ = this.store.pipe(select(amountOfPresentationColumns));
    }

    private initColumnEntities(): void {
        this.columnsEntities$ = this.store.pipe(select(selectColumnsState));
    }

    private addSectionOnDrop(event: DragEvent): void {
        event.stopImmediatePropagation();

        this.slideMove = JSON.parse(event.dataTransfer.getData('string'));
        console.log(this.slideMove);
        if (this.slideMove.columnID === undefined && this.slideMove.slideID) { // jesli drag n drop z biblioteki
            this.matDialog.open(ColumnTitleComponent, {
                disableClose: true,
                hasBackdrop: true,
            }).afterClosed().pipe(
                filter((columnTitle: string) => !!columnTitle),
                first(),
                withLatestFrom(
                    this.store.pipe(select(selectSlideFromLibaryById(this.slideMove.slideID))),
                    this.store.pipe(select(amountOfPresentationColumns)),
                ))
            .subscribe(([ columnTitle, droppedSlide, numberOfColumns ]: [ string, Slide, number ]) => {

                // dodaj element w nowej kolumnie
                this.store.dispatch(new AddColumn({
                    column: {
                        id: numberOfColumns,
                        title: columnTitle,
                        slides: [ droppedSlide ],
                    },
                }));

                // usun element z biblioteki
                this.store.dispatch(new DeleteSlidesFromLibary({ ids: [ this.slideMove.slideID ] }));
            });
        } else if (this.slideMove.columnID >= 0 && this.slideMove.slideID) { // jesli drag n drop z innej kolumny
            console.log(this.slideMove);
            this.matDialog.open(ColumnTitleComponent, {
                disableClose: true,
                hasBackdrop: true,
            }).afterClosed().pipe(
                filter((columnTitle: string) => !!columnTitle),
                first(),
                withLatestFrom(
                    this.store.pipe(select(selectColumnByID(this.slideMove.columnID))),
                    this.store.pipe(select(amountOfPresentationColumns)),
                ),
            ).subscribe(([ columnTitle, startedColumn, numberOfColumns ]: [ string, Column, number ]) => {
                // dodaj element w nowej kolumnie
                this.store.dispatch(new AddColumn({
                    column: {
                        id: numberOfColumns,
                        title: columnTitle,
                        slides: [ startedColumn.slides.find((slide: Slide) => {
                            return slide.id === this.slideMove.slideID;
                        }) ],
                    },
                }));

                // usun element z  poprzedniej kolumny
                this.store.dispatch(new UpdateColumn({
                    column: {
                        id: this.slideMove.columnID,
                        changes: {
                            slides: startedColumn.slides.filter((slide: Slide) => {
                                return slide.id !== this.slideMove.slideID;
                            }),
                        },
                    },
                }));
            });
        }
    }
}
