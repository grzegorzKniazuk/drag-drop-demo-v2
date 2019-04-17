import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { AddPresentation } from '../../../modules/dashboard/components/presentation-libary/store/actions/presentation-list.actions';
import { MatDialog } from '@angular/material';
import { PresentationTitleComponent } from '../presentation-title/presentation-title.component';
import { filter, first } from 'rxjs/operators';

@Component({
    selector: 'dd-no-presentations',
    templateUrl: './no-presentations.component.html',
    styleUrls: [ './no-presentations.component.scss' ],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class NoPresentationsComponent {

    constructor(
        private store: Store<AppState>,
        private matDialog: MatDialog,
    ) {
    }

    public addPresentation(): void {
        this.matDialog.open(PresentationTitleComponent, {
            disableClose: true,
            hasBackdrop: true,
        }).afterClosed().pipe(
            first(),
            filter((presentationTitle: string) => !!presentationTitle),
        ).subscribe((presentationTitle: string) => {
            this.store.dispatch(new AddPresentation({
                presentation: {
                    id: 0,
                    title: presentationTitle,
                    columns: [],
                },
            }));
        });
    }
}
