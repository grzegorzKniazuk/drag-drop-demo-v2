import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from 'src/app/modules/dashboard/dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import * as fromDashboard from './store';
import { PresentationCreatorModule } from 'src/app/modules/dashboard/components/presentation-creator/presentation-creator.module';
import { PresentationLibaryModule } from './components/presentation-libary/presentation-libary.module';

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [
        DashboardRoutingModule,
        StoreModule.forFeature('dashboard', fromDashboard.reducers, { metaReducers: fromDashboard.metaReducers }),
        PresentationCreatorModule,
        PresentationLibaryModule,
    ],
})
export class DashboardModule {
}
