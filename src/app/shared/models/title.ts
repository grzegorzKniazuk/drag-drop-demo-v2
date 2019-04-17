import { MatDialogRef } from '@angular/material';

export abstract class Title<T> {
    public presentationTitle: string;

    protected constructor(
        private matDialogRef: MatDialogRef<T>,
    ) {
    }
    public cancel(): void {
        this.matDialogRef.close();
    }
}
