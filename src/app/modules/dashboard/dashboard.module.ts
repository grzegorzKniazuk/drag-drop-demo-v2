import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Route, RouterModule } from '@angular/router';
import { EditPresentationComponent } from './edit-presentation/edit-presentation.component';

const routes: Route[] = [
    {
        path: '', component: DashboardComponent, children: [
            { path: '', redirectTo: 'edit-presentation', pathMatch: 'full' },
            { path: 'edit-presentation', component: EditPresentationComponent },
        ],
    },
];

@NgModule({
    declarations: [
        DashboardComponent,
        EditPresentationComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
})
export class DashboardModule {
}
