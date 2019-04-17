import { NgModule } from '@angular/core';
import { PresentationLibaryComponent } from './presentation-libary.component';
import { StoreModule } from '@ngrx/store';
import * as fromPresentationLibary from './store';
import { SharedModule } from '../../../../shared/shared.module';

@NgModule({
    declarations: [
        PresentationLibaryComponent,
    ],
    imports: [
        SharedModule,
        StoreModule.forFeature('presentationLibary', fromPresentationLibary.reducers, { metaReducers: fromPresentationLibary.metaReducers }),
    ],
})
export class PresentationLibaryModule {
}
