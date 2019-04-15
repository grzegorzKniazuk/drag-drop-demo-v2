import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import 'hammerjs';
import { StoreModule } from '@ngrx/store';
import { baseReducers, metaReducers } from 'src/app/store/base.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        StoreModule.forRoot(baseReducers, { metaReducers }),
        EffectsModule.forRoot([ ]),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
    ],
    providers: [],
    bootstrap: [ AppComponent ],
})
export class AppModule {
}
