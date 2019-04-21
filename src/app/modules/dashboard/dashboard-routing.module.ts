import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { PresentationCreatorComponent } from 'src/app/modules/dashboard/components/presentation-creator/presentation-creator.component';
import { PresentationLibaryComponent } from './components/presentation-libary/presentation-libary.component';
import { EditSlideComponent } from './components/presentation-creator/edit-slide/edit-slide.component';

const routes: Route[] = [
    {
        path: '', component: DashboardComponent, children: [
            { path: '', redirectTo: 'presentation-libary', pathMatch: 'full' },
            { path: 'presentation-libary', component: PresentationLibaryComponent },
            { path: 'presentation-creator', component: PresentationCreatorComponent },
            { path: 'presentation-creator/:columnid/:slideid', component: EditSlideComponent },
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class DashboardRoutingModule {
}
