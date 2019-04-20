import { MatDialogRef } from '@angular/material';
import { HostListener } from '@angular/core';

export abstract class Title<T> {
    public title: string;

    protected constructor(
        private matDialogRef: MatDialogRef<T>,
    ) {
    }

    public cancel(): void {
        this.matDialogRef.close();
    }

    @HostListener('document:keyup.enter')
    public submit(): void {
        this.matDialogRef.close(this.title);
    }
}
