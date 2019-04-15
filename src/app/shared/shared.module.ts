import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { FileUploaderComponent } from 'src/app/shared/components/file-uploader/file-uploader.component';
import { NoSlidesInPresentationComponent } from 'src/app/shared/components/no-slides-in-presentation/no-slides-in-presentation.component';

@NgModule({
    declarations: [
        FileUploaderComponent,
        NoSlidesInPresentationComponent,
    ],
    entryComponents: [
        NoSlidesInPresentationComponent,
    ],
    imports: [
        CommonModule,
        MaterialModule,
    ],
    exports: [
        MaterialModule,
        FileUploaderComponent,
        NoSlidesInPresentationComponent,
    ],
})
export class SharedModule {
}
