import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { DividerSiblings } from '../../interfaces/divider-siblings';
import { Droppable } from '../../models/droppable';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { ColumnTitleComponent } from '../column-title/column-title.component';
import { MatDialog } from '@angular/material';
import { filter, first, tap, withLatestFrom } from 'rxjs/operators';
import { selectColumnsState } from 'src/app/modules/dashboard/components/presentation-creator/store/selectors/column.selectors';
import { Column } from '../../interfaces/column';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { SlideMove } from '../../interfaces/slideMove';
import { AddColumns, DeleteAllColumns } from '../../../modules/dashboard/components/presentation-creator/store/actions/column.actions';
import { Slide } from '../../interfaces/slide';
import { selectSlideFromLibaryById } from '../../../modules/dashboard/components/presentation-creator/store/selectors/slide-libary.selectors';
import { DeleteSlidesFromLibary } from '../../../modules/dashboard/components/presentation-creator/store/actions/slide-libary.actions';

@AutoUnsubscribe()
@Component({
    selector: 'dd-columns-divider',
    templateUrl: './columns-divider.component.html',
    styleUrls: [ './columns-divider.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnsDividerComponent extends Droppable implements OnInit, OnDestroy {

    @Input() public dividerSibilings: DividerSiblings;

    constructor(
        private matDialog: MatDialog,
        private store: Store<AppState>,
        private changeDetectorRef: ChangeDetectorRef,
    ) {
        super();
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    public onDropOnDivider(event: DragEvent): void {
        event.stopImmediatePropagation();

        const slideMove: SlideMove = JSON.parse(event.dataTransfer.getData('string')); // columnID, slideID

        if (slideMove.columnID >= 0) { // jesli slajd przeniesiony z innej kolumny
            this.matDialog.open(ColumnTitleComponent, {
                disableClose: true,
                hasBackdrop: true,
            }).afterClosed().pipe(
                filter((columnTitle: string) => !!columnTitle),
                first(),
                withLatestFrom(this.store.pipe(select(selectColumnsState))),
                tap(() => {
                    this.isElementOnDragOver = false;
                    this.changeDetectorRef.detectChanges();
                }),
            ).subscribe(([ columTitle, columns ]: [ string, Column[] ]) => {

                // zrodlowa kolumna
                const sourceColumn = columns.find((column: Column) => {
                    return column.id === slideMove.columnID;
                });

                // slajd do przeniesienia
                const sourceSlide = sourceColumn.slides.find((slide: Slide) => {
                    return slide.id === slideMove.slideID;
                });

                // aktualizuj column id dla slajdu
                sourceSlide.columnId = this.dividerSibilings.leftSideColumnID + 1;

                // przygotuj kolumny
                columns.forEach((column: Column) => {

                    // usun slajd z kolumny poczatkowej
                    if (column.id === slideMove.columnID) {
                        column.slides = column.slides.filter((slide: Slide) => {
                            return slide.id !== slideMove.slideID;
                        });
                    }

                    // podnies id kolumn po prawej stronie
                    if (column.id >= this.dividerSibilings.rightSideColumnID) {
                        column.id++;
                        column.slides.forEach((slide: Slide) => {
                            slide.columnId++;
                        });
                    }
                });

                // stworz obiekt nowej kolumny
                const newColumn: Column = {
                    id: this.dividerSibilings.leftSideColumnID + 1,
                    title: columTitle,
                    slides: [ sourceSlide ],
                };

                // aktualizuj tablice kolumn
                columns = [
                    ...columns.slice(0, this.dividerSibilings.leftSideColumnID + 1),
                    newColumn,
                    ...columns.slice(this.dividerSibilings.rightSideColumnID, columns.length),
                ];

                // wyczysc kolumny
                this.store.dispatch(new DeleteAllColumns());

                // dodaj zaktualizowane kolumny
                this.store.dispatch(new AddColumns({ columns }));
            });
        } else if (slideMove.columnID === undefined) { // jesli slajd przeniesiony z bibloteki
            this.matDialog.open(ColumnTitleComponent, {
                disableClose: true,
                hasBackdrop: true,
            }).afterClosed().pipe(
                filter((columnTitle: string) => !!columnTitle),
                first(),
                withLatestFrom(
                    this.store.pipe(select(selectSlideFromLibaryById(slideMove.slideID))), // slajd do przeniesienia
                    this.store.pipe(select(selectColumnsState)), // wszystkie kolumny
                ),
                tap(() => {
                    this.isElementOnDragOver = false;
                    this.changeDetectorRef.detectChanges();
                }),
            ).subscribe(([ columTitle, sourceSlide, columns ]: [ string, Slide, Column[] ]) => {

                // przygotuj kolumny
                columns.forEach((column: Column) => {
                    if (column.id >= this.dividerSibilings.rightSideColumnID) {
                        column.id++;
                        column.slides.forEach((slide: Slide) => {
                            slide.columnId++;
                        });
                    }
                });

                // aktualizuj column id dla slajdu
                sourceSlide.columnId = this.dividerSibilings.leftSideColumnID + 1;

                // stworz obiekt nowej kolumny
                const newColumn: Column = {
                    id: this.dividerSibilings.leftSideColumnID + 1,
                    title: columTitle,
                    slides: [ sourceSlide ],
                };

                // aktualizuj tablice kolumn
                columns = [
                    ...columns.slice(0, this.dividerSibilings.leftSideColumnID + 1),
                    newColumn,
                    ...columns.slice(this.dividerSibilings.rightSideColumnID, columns.length),
                ];

                // usun slajd z listy nierozmieszczonych slajdow
                this.store.dispatch(new DeleteSlidesFromLibary({ ids: [ sourceSlide.id ] }));

                // wyczysc kolumny
                this.store.dispatch(new DeleteAllColumns());

                // dodaj zaktualizowane kolumny
                this.store.dispatch(new AddColumns({ columns }));
            });
        }
    }
}
