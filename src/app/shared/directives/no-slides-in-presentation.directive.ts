import { ComponentFactory, ComponentFactoryResolver, ComponentRef, Directive, OnInit, ViewContainerRef } from '@angular/core';
import { NoSlidesInPresentationComponent } from 'src/app/shared/components/no-slides-in-presentation/no-slides-in-presentation.component';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/base.reducers';
import { columnsAmount } from 'src/app/store/selectors/columns.selectors';

@Directive({
    selector: '[ddNoSlidesInPresentation]',
})
export class NoSlidesInPresentationDirective implements OnInit {

    private readonly componentFactory: ComponentFactory<NoSlidesInPresentationComponent> = this.componentFactoryResolver.resolveComponentFactory(NoSlidesInPresentationComponent);
    private componentRef: ComponentRef<NoSlidesInPresentationComponent>;

    constructor(
        private viewContainerRef: ViewContainerRef,
        private store: Store<AppState>,
        private componentFactoryResolver: ComponentFactoryResolver,
    ) {
    }

    ngOnInit() {
        this.observeAmountOfColumnsInPresentation();
    }

    private observeAmountOfColumnsInPresentation(): void {
        this.store.pipe(
            select(columnsAmount),
        ).subscribe((numberOfColumns: number) => {
           if (!numberOfColumns) {
               this.componentRef = this.viewContainerRef.createComponent(this.componentFactory, 0);
           } else {
               this.viewContainerRef.remove(0);
           }
        });
    }

}
