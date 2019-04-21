import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Title } from '../../models/title';

@Component({
    selector: 'dd-presentation-title',
    templateUrl: './presentation-title.component.html',
    styleUrls: [ './presentation-title.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationTitleComponent extends Title<PresentationTitleComponent> {
    constructor(
        matDialogRef: MatDialogRef<PresentationTitleComponent>,
        changeDetectorRef: ChangeDetectorRef,
    ) {
        super(matDialogRef, changeDetectorRef);
    }
}
