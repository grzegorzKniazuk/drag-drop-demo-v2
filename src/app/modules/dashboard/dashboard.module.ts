import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { PresentationCreatorComponent } from './components/presentation-creator/presentation-creator.component';
import { DashboardRoutingModule } from 'src/app/modules/dashboard/dashboard-routing.module';

@NgModule({
    declarations: [
        DashboardComponent,
        PresentationCreatorComponent,
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
    ],
})
export class DashboardModule {
}
