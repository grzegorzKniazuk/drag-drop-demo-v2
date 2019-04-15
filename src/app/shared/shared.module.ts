import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { NoSlidesInPresentationComponent } from 'src/app/shared/components/no-slides-in-presentation/no-slides-in-presentation.component';
import { NoSlidesInPresentationDirective } from 'src/app/shared/directives/no-slides-in-presentation.directive';

const components = [
    NoSlidesInPresentationComponent,
];

const entryConponents = [
    NoSlidesInPresentationComponent,
];

const directives = [
    NoSlidesInPresentationDirective,
];

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
