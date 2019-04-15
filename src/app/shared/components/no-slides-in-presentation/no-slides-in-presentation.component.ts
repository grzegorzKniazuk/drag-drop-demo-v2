import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
    selector: 'dd-no-slides-in-presentation',
    templateUrl: './no-slides-in-presentation.component.html',
    styleUrls: [ './no-slides-in-presentation.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoSlidesInPresentationComponent {

    @ViewChild('labelElement') private labelElement: ElementRef;

    public clickIntoLabel(): void {
        this.labelElement.nativeElement.click();
    }

    public uploadFile(event: any): void {
        const files: FileList = event.target.files || event.dataTransfer.files;

        for (let i = 0; i < files.length; i++) {
            if (files.item(i).type.match('image')) {
                const fileReader = new FileReader();

                fileReader.readAsDataURL(files.item(i));
                console.log(files.item(i));
                fileReader.onloadend = () => {
                    const imageBuffer = fileReader.result;
                };
            } else {
                alert('Wrzuć JPG/PNG');
            }
        }
    }
}
