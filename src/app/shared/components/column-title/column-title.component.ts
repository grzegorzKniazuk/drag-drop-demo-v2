import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Title } from '../../models/title';
import { MatDialogRef } from '@angular/material';

@Component({
    selector: 'dd-column-title',
    templateUrl: './column-title.component.html',
    styleUrls: [ './column-title.component.scss' ],
    changeDetection: ChangeDetectionStrategy.Default,
})
export class ColumnTitleComponent extends Title<ColumnTitleComponent> {

    public columnTitle: string;

    constructor(matDialogRef: MatDialogRef<ColumnTitleComponent>) {
        super(matDialogRef);
    }
}
