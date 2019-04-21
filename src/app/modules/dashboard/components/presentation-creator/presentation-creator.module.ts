import { NgModule } from '@angular/core';
import { PresentationCreatorComponent } from 'src/app/modules/dashboard/components/presentation-creator/presentation-creator.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import * as fromPresentationCreator from './store';
import { EffectsModule } from '@ngrx/effects'

@NgModule({
    declarations: [
        PresentationCreatorComponent,
    ],
    imports: [
        SharedModule,
        StoreModule.forFeature('presentationCreator', fromPresentationCreator.reducers, { metaReducers: fromPresentationCreator.metaReducers }),
        EffectsModule.forFeature([ ]),
    ],
    exports: [
        PresentationCreatorComponent,
    ],
})
export class PresentationCreatorModule {
}
