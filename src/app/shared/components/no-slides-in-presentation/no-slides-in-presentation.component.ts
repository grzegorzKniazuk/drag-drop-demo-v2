import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { FileUploader } from '../../models/file-uploader';

@Component({
    selector: 'dd-no-slides-in-presentation',
    templateUrl: './no-slides-in-presentation.component.html',
    styleUrls: [ './no-slides-in-presentation.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoSlidesInPresentationComponent extends FileUploader {

    constructor(store: Store<AppState>) {
        super(store);
    }
}
