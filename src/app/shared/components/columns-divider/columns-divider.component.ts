import { Component, Input, OnInit } from '@angular/core';
import { DividerSiblings } from '../../interfaces/divider-siblings';

@Component({
    selector: 'dd-columns-divider',
    templateUrl: './columns-divider.component.html',
    styleUrls: [ './columns-divider.component.scss' ],
})
export class ColumnsDividerComponent implements OnInit {

    @Input() public dividerSibilings: DividerSiblings;

    constructor() {
    }

    ngOnInit() {
        console.log(this.dividerSibilings);
    }

}
