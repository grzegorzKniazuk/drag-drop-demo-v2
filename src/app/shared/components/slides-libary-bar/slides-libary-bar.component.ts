import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
    selector: 'dd-slides-libary-bar',
    templateUrl: './slides-libary-bar.component.html',
    styleUrls: [ './slides-libary-bar.component.scss' ],
})
export class SlidesLibaryBarComponent implements OnInit {

    @ViewChild('slidesLibaryContainer', { read: ViewContainerRef }) private slidesLibaryContainer: ViewContainerRef;

    constructor() {
    }

    ngOnInit() {
    }

}
