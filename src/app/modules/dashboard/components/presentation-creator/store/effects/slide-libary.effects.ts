import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable({
    providedIn: 'root',
})
export class SlideLibaryEffects {



    constructor(private actions$: Actions) {
    }
}
