import { Component, Input, OnInit } from '@angular/core';
import { Slide } from 'src/app/shared/interfaces/slide';

@Component({
    selector: 'dd-slide-thumbnail',
    templateUrl: './slide-thumbnail.component.html',
    styleUrls: [ './slide-thumbnail.component.scss' ],
})
export class SlideThumbnailComponent implements OnInit {

    @Input() public slide: Slide;

    constructor() {
    }

    ngOnInit() {
    }

    public dragStart(event: DragEvent, slideId: number): void {
        event.dataTransfer.setData('string', `${slideId}`);
    }
}
