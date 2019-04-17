import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { NoSlidesInPresentationComponent } from 'src/app/shared/components/no-slides-in-presentation/no-slides-in-presentation.component';
import { SlidesLibaryBarComponent } from 'src/app/shared/components/slides-libary-bar/slides-libary-bar.component';
import { ColumnsZoneComponent } from 'src/app/shared/components/columns-zone/columns-zone.component';
import { SlideThumbnailComponent } from 'src/app/shared/components/slide-thumbnail/slide-thumbnail.component';
import { NoPresentationsComponent } from './components/no-presentations/no-presentations.component';
import { PresentationThumbnailComponent } from './components/presentation-thumbnail/presentation-thumbnail.component';
import { PresentationTitleComponent } from './components/presentation-title/presentation-title.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColumnsDividerComponent } from './components/columns-divider/columns-divider.component';
import { ColumnTitleComponent } from './components/column-title/column-title.component';
import { ColumnComponent } from './components/column/column.component';

const components = [
    NoSlidesInPresentationComponent,
    SlidesLibaryBarComponent,
    ColumnsZoneComponent,
    SlideThumbnailComponent,
    NoPresentationsComponent,
    PresentationThumbnailComponent,
    PresentationTitleComponent,
    ColumnsDividerComponent,
    ColumnTitleComponent,
    ColumnComponent,
];

const entryConponents = [
    PresentationTitleComponent,
    ColumnTitleComponent,
];

const directives = [];

const modules = [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
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
