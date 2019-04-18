import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'dd-columns-divider',
    templateUrl: './columns-divider.component.html',
    styleUrls: [ './columns-divider.component.scss' ],
})
export class ColumnsDividerComponent implements OnInit {

    @Input() public isDropZone: boolean;

    constructor() {
    }

    ngOnInit() {
    }

}
