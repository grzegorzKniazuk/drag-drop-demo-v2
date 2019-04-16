import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { NoSlidesInPresentationComponent } from 'src/app/shared/components/no-slides-in-presentation/no-slides-in-presentation.component';
import { SlidesLibaryBarComponent } from 'src/app/shared/components/slides-libary-bar/slides-libary-bar.component';
import { ColumnsZoneComponent } from 'src/app/shared/components/columns-zone/columns-zone.component';

const components = [
    NoSlidesInPresentationComponent,
    SlidesLibaryBarComponent,
    ColumnsZoneComponent,
];

const entryConponents = [];

const directives = [];

const modules = [
    CommonModule,
    MaterialModule,
];

@NgModule({
    declarations: [
        ...components,
        ...directives,
    ],
    entryComponents: [
        ...entryConponents,
    ],
    imports: [
        ...modules,
    ],
    exports: [
        ...modules,
        ...components,
        ...directives,
    ],
})
export class SharedModule {
}
