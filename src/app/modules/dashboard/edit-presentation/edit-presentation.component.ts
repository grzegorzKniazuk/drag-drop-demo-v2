import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'dd-edit-presentation',
    templateUrl: './edit-presentation.component.html',
    styleUrls: [ './edit-presentation.component.scss' ],
})
export class EditPresentationComponent implements OnInit {

    constructor(private title: Title) {
    }

    ngOnInit() {
        this.setTabTitle();
    }

    private setTabTitle(): void {
        this.title.setTitle('Edycja prezentacji');
    }

}
