import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { AddSlides } from 'src/app/modules/dashboard/components/presentation-creator/store/actions/slide.actions';
import { Slide } from 'src/app/shared/interfaces/slide';

@Component({
    selector: 'dd-no-slides-in-presentation',
    templateUrl: './no-slides-in-presentation.component.html',
    styleUrls: [ './no-slides-in-presentation.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoSlidesInPresentationComponent {

    @ViewChild('labelElement') private labelElement: ElementRef;
    private files: FileList;
    private slides: Slide[] = [];

    constructor(private store: Store<AppState>) {
    }

    public clickIntoLabel(): void {
        this.labelElement.nativeElement.click();
    }

    public uploadFile(event: any): void {
        this.files = event.target.files || event.dataTransfer.files;

        this.addSlides();
    }

    private addSlides(): void {
        this.prepareSlides().then((slides: Slide[]) => {
            this.store.dispatch(new AddSlides({ slides }));
        });
    }

    private prepareSlides(): Promise<Slide[]> {
        return new Promise<Slide[]>(((resolve, reject) => {
            for (let i = 0; i < this.files.length; i++) {
                if (this.files.item(i).type.match('image')) {
                    const fileReader = new FileReader();

                    fileReader.readAsDataURL(this.files.item(i));

                    fileReader.onloadend = () => {
                        const imageBuffer = fileReader.result;

                        this.slides.push({
                            id: i,
                            columnId: 0,
                            imageData: imageBuffer,
                            actions: [],
                        });

                        if (i + 1 === this.files.length) {
                            resolve(this.slides);
                        }
                    };

                    fileReader.onerror = () => {
                        alert('Wystąpił błąd');
                        reject('Wystąpił błąd');
                    };
                } else {
                    reject('Wrzuć JPG/PNG');
                    alert('Wrzuć JPG/PNG');
                }
            }
        }))
    }
}
