import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { PresentationCreatorComponent } from './components/presentation-creator/presentation-creator.component';
import { DashboardRoutingModule } from 'src/app/modules/dashboard/dashboard-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
    declarations: [
        DashboardComponent,
        PresentationCreatorComponent,
    ],
    imports: [
        DashboardRoutingModule,
        SharedModule,
    ],
})
export class DashboardModule {
}
