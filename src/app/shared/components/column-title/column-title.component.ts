import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Title } from '../../models/title';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'dd-column-title',
    templateUrl: './column-title.component.html',
    styleUrls: [ './column-title.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnTitleComponent extends Title<ColumnTitleComponent> {

    constructor(
        matDialogRef: MatDialogRef<ColumnTitleComponent>,
        changeDetectorRef: ChangeDetectorRef,
    ) {
        super(matDialogRef, changeDetectorRef);
    }
}
