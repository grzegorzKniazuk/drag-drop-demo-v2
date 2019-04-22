import { NgModule } from '@angular/core';
import { PresentationLibaryComponent } from './presentation-libary.component';
import { StoreModule } from '@ngrx/store';
import * as fromPresentationLibary from './store';
import { SharedModule } from 'src/app/shared/shared.module';
import { EffectsModule } from '@ngrx/effects';
import { PresentationListEffects } from './store/effects/presentation-list.effects';

@NgModule({
    declarations: [
        PresentationLibaryComponent,
    ],
    imports: [
        SharedModule,
        StoreModule.forFeature('presentationLibary', fromPresentationLibary.reducers, { metaReducers: fromPresentationLibary.metaReducers }),
        EffectsModule.forFeature([ PresentationListEffects ]),
    ],
})
export class PresentationLibaryModule {
}
