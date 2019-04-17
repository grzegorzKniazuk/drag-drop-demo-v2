import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'dd-presentation-title',
    templateUrl: './presentation-title.component.html',
    styleUrls: [ './presentation-title.component.scss' ],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class PresentationTitleComponent {

    public presentationTitle: string;

    constructor(
        private matDialogRef: MatDialogRef<PresentationTitleComponent>,
    ) {
    }
    public cancel(): void {
        this.matDialogRef.close();
    }
}
