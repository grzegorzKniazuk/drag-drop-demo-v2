import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { filter } from 'rxjs/operators';

@AutoUnsubscribe()
@Component({
    selector: 'dd-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [ './dashboard.component.scss' ],
})
export class DashboardComponent implements OnInit, OnDestroy {

    private readonly routes = {
        'presentation-creator': 'Kreator prezentacji',
    };

    constructor(
        private router: Router,
        private title: Title,
    ) {
    }

    ngOnInit() {
        this.changeTabTitleOnLoad();
        this.initDashboardTabsTitleChanger();
    }

    ngOnDestroy() {
    }

    private changeTabTitleOnLoad(): void {
        this.title.setTitle(this.routes[this.extractUrlTarget(this.router.url)]);
    }

    private initDashboardTabsTitleChanger(): void {
        this.router.events.pipe(
            filter((event: RouterEvent) => event instanceof NavigationEnd),
        ).subscribe((event: NavigationEnd) => {
            this.title.setTitle(this.routes[this.extractUrlTarget(event.url || 'brak nazwy route')]);
        });
    }

    private extractUrlTarget(url: string): string {
        return url.split('/')[url.split('/').length - 1];
    }
}
