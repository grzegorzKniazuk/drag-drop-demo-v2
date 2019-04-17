import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { Observable } from 'rxjs';
import { amountOfPresentationColumns } from 'src/app/modules/dashboard/components/presentation-creator/store/selectors/column.selectors';
import { Droppable } from '../../models/droppable';
import { first } from 'rxjs/operators';

@Component({
    selector: 'dd-columns-zone',
    templateUrl: './columns-zone.component.html',
    styleUrls: [ './columns-zone.component.scss' ],
})
export class ColumnsZoneComponent extends Droppable implements OnInit {

    public amountOfPresentationColumns$: Observable<number>;

    constructor(
        private store: Store<AppState>,
        ) {
        super();
    }

    ngOnInit() {
        this.initAmountOfPresentationColumns();
    }

    private initAmountOfPresentationColumns(): void {
        this.amountOfPresentationColumns$ = this.store.pipe(select(amountOfPresentationColumns));
    }

    private addSectionOnDrop(event: DragEvent): void {
        console.log(event.dataTransfer.getData('string'));
    }

}
