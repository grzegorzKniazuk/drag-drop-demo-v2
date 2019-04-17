import { Component, Input, OnInit } from '@angular/core';
import { Slide } from '../../interfaces/slide';

@Component({
    selector: 'dd-column',
    templateUrl: './column.component.html',
    styleUrls: [ './column.component.scss' ],
})
export class ColumnComponent implements OnInit {

    @Input() public id: number;
    @Input() public title: string;
    @Input() public slides: Slide[];

    constructor() {
    }

    ngOnInit() {
    }

}
