import { MatDialogRef } from '@angular/material';
import { ChangeDetectorRef, HostListener } from '@angular/core';

export abstract class Title<T> {
    public title: string;

    protected constructor(
        private matDialogRef: MatDialogRef<T>,
        private changeDetectorRef: ChangeDetectorRef,
    ) {
    }

    public cancel(): void {
        this.matDialogRef.close();
        this.changeDetectorRef.detectChanges();
    }

    @HostListener('document:keyup.enter')
    public submit(): void {
        this.matDialogRef.close(this.title);
    }
}
