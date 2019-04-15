import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';

@NgModule({
    imports: [
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
    ],
    exports: [
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
    ],
})
export class MaterialModule {
}
