import { ComponentFactoryResolver, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ComponentFactoryService {

    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    }
}
