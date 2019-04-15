import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Route, RouterModule } from '@angular/router';
import { PresentationCreatorComponent } from './components/presentation-creator/presentation-creator.component';
import { StoreModule } from '@ngrx/store';
import * as fromDashboardState from 'src/app/modules/dashboard/dashboard-base.reducers';

const routes: Route[] = [
    {
        path: '', component: DashboardComponent, children: [
            { path: '', redirectTo: 'edit-presentation', pathMatch: 'full' },
            { path: 'presentation-creator', component: PresentationCreatorComponent },
        ],
    },
];

@NgModule({
    declarations: [
        DashboardComponent,
        PresentationCreatorComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        StoreModule.forFeature('dashboardState', fromDashboardState.reducers, { metaReducers: fromDashboardState.metaReducers }),
    ],
})
export class DashboardModule {
}
