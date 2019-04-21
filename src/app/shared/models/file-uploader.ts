import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import { ElementRef, ViewChild } from '@angular/core';
import { Slide } from '../interfaces/slide';
import { AddSlidesToLibary } from '../../modules/dashboard/components/presentation-creator/store/actions/slide-libary.actions';
import { DemoFilesImageData } from './demo-files-image-data';

export abstract class FileUploader extends DemoFilesImageData {

    @ViewChild('fileInputElement') protected fileInputElement: ElementRef;
    protected files: FileList;
    protected slides: Slide[] = [];

    protected constructor(protected store: Store<AppState>) {
        super();
    }

    public clickIntoFileInput(): void {
        this.fileInputElement.nativeElement.click();
    }

    public uploadFiles(event: any): void {
        this.files = event.target.files || event.dataTransfer.files;

        this.prepareSlides().then((slides: Slide[]) => {
            this.store.dispatch(new AddSlidesToLibary({ slides }));
        }).finally(() => {
            this.slides = [];
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
                            id: Math.floor((Math.random() * 10000000) + 1),
                            columnId: null,
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
        }));
    }
}
