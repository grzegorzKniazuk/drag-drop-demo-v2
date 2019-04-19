import { Component, Input, OnInit } from '@angular/core';
import { Slide } from 'src/app/shared/interfaces/slide';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { MoveSlideStart } from '../../../modules/dashboard/components/presentation-creator/store/actions/column.actions';

@Component({
    selector: 'dd-slide-thumbnail',
    templateUrl: './slide-thumbnail.component.html',
    styleUrls: [ './slide-thumbnail.component.scss' ],
})
export class SlideThumbnailComponent implements OnInit {

    @Input() public columnID: number;
    @Input() public slide: Slide;

    constructor(
        private store: Store<AppState>,
        ) {
    }

    ngOnInit() {
    }

    public dragStart(event: DragEvent, slideId: number): void {
        // event.dataTransfer.setData('string', `${slideId}`);
        this.store.dispatch(new MoveSlideStart({
            columnID: this.columnID,
            slideID: slideId,
        }));
    }
}
