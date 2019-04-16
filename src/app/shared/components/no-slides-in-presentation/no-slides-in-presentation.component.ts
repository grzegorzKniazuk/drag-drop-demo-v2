import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';

@Component({
    selector: 'dd-no-slides-in-presentation',
    templateUrl: './no-slides-in-presentation.component.html',
    styleUrls: [ './no-slides-in-presentation.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoSlidesInPresentationComponent {

    @ViewChild('labelElement') private labelElement: ElementRef;

    constructor(private store: Store<AppState>) {
    }

    public clickIntoLabel(): void {
        this.labelElement.nativeElement.click();
    }

    public uploadFile(event: any): void {
        const files: FileList = event.target.files || event.dataTransfer.files;

        if (files.length > 1) {
            for (let i = 0; i < files.length; i++) {
                if (files.item(i).type.match('image')) {
                    const fileReader = new FileReader();

                    fileReader.readAsDataURL(files.item(i));

                    fileReader.onloadend = () => {
                        const imageBuffer = fileReader.result;
                    };

                    fileReader.onerror = () => {
                        alert('Wystąpił błąd');
                    };
                } else {
                    alert('Wrzuć JPG/PNG');
                }
            }
        } else {
            if (files.item(0).type.match('image')) {
                const fileReader = new FileReader();
                fileReader.readAsDataURL(files.item(0));

                fileReader.onloadend = () => {
                    const imageBuffer = fileReader.result;
                };

                fileReader.onerror = () => {
                    alert('Wystąpił błąd');
                };
            } else {
                alert('Wrzuć JPG/PNG');
            }

        }

    }
}
