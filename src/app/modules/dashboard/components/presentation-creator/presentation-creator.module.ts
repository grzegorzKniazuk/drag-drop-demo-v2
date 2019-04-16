import { NgModule } from '@angular/core';
import { PresentationCreatorComponent } from 'src/app/modules/dashboard/components/presentation-creator/presentation-creator.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StoreModule } from '@ngrx/store';
import * as fromPresentationCreator from './store';
import { EffectsModule } from '@ngrx/effects';
import { SlideEffects } from 'src/app/modules/dashboard/components/presentation-creator/store/effects/slide.effects';
import { ColumnEffects } from 'src/app/modules/dashboard/components/presentation-creator/store/effects/column.effects';
import { SlideLibaryEffects } from 'src/app/modules/dashboard/components/presentation-creator/store/effects/slide-libary.effects';

@NgModule({
    declarations: [
        PresentationCreatorComponent,
    ],
    imports: [
        SharedModule,
        StoreModule.forFeature('presentationCreator', fromPresentationCreator.reducers, { metaReducers: fromPresentationCreator.metaReducers }),
        EffectsModule.forFeature([ SlideEffects, ColumnEffects, SlideLibaryEffects ]),
    ],
    exports: [
        PresentationCreatorComponent,
    ],
})
export class PresentationCreatorModule {
}
