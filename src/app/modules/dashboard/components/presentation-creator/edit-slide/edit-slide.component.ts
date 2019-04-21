import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../../../../store';
import { ActivatedRoute } from '@angular/router';
import { Slide } from '../../../../../shared/interfaces/slide';
import { selectColumnsState } from '../store/selectors/column.selectors';
import { first } from 'rxjs/operators';
import { Column } from '../../../../../shared/interfaces/column';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { Rectangle } from '../../../../../shared/interfaces/rectangle';
import { selectSlideFromLibaryById } from '../store/selectors/slide-libary.selectors';

@AutoUnsubscribe()
@Component({
    selector: 'dd-edit-slide',
    templateUrl: './edit-slide.component.html',
    styleUrls: [ './edit-slide.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditSlideComponent implements OnInit, AfterViewInit, OnDestroy {

    public backgroundImageStyle: SafeStyle;
    @ViewChild('canvasElement') private canvasElement: ElementRef;
    private slide: Slide;
    private columnID: number | string;
    private slideID: number;
    private context: CanvasRenderingContext2D;
    private startCords: { x: number, y: number };
    private endCords: { x: number, y: number };
    private readonly rectangles: Rectangle[] = [];

    private canvasComponent: {
        data: string;
        rectangles: Rectangle[],
    };

    constructor(
        private activatedRoute: ActivatedRoute,
        private store: Store<AppState>,
        private changeDetectorRef: ChangeDetectorRef,
        private domSanitizer: DomSanitizer,
    ) {
    }

    ngOnInit() {
        this.getRouteParams();
    }

    ngAfterViewInit() {
        // inicjalizacja kontekstu dla canvas
        this.context = this.canvasElement.nativeElement.getContext('2d');
    }

    ngOnDestroy() {
    }

    public mouseDown(event: MouseEvent): void {
        event.stopImmediatePropagation();

        this.getCursorPosition(event);
        this.startCords = this.getCursorPosition(event);
    }

    public mouseUp(event: MouseEvent): void {
        event.stopImmediatePropagation();

        this.endCords = this.getCursorPosition(event);

        if (this.startCords.x + 30 < this.endCords.x && this.startCords.y + 30 < this.endCords.y) {
            this.drawRectangle();

            this.rectangles.push({
                actionType: `action: ${this.startCords.x}`,
                topLeft: {
                    x: this.startCords.x,
                    y: this.startCords.y,
                },
                topRight: {
                    x: this.endCords.x,
                    y: this.startCords.y,
                },
                bottomLeft: {
                    x: this.startCords.x,
                    y: this.endCords.y,
                },
                bottomRight: {
                    x: this.endCords.x,
                    y: this.endCords.y,
                },
            });

            this.startCords = null;
            this.endCords = null;
        }
    }

    public mouseMove(event: MouseEvent): void {
        event.stopImmediatePropagation();

        if (this.startCords && this.endCords) {
            this.context.clearRect(this.startCords.x, this.startCords.y, this.endCords.x - this.startCords.x, this.endCords.y - this.startCords.y);
        }
        if (event.buttons) {
            this.endCords = this.getCursorPosition(event);
            this.drawRectangle();
        }
    }

    public save(): void { // zapisz jako png
        this.canvasComponent = {
            data: this.canvasElement.nativeElement.toDataURL('image/png'),
            rectangles: this.rectangles,
        };
        return this.canvasElement.nativeElement.toDataURL('image/png');
    }

    public click(event: MouseEvent): void {
        event.stopImmediatePropagation();

        const { x, y } = this.getCursorPosition(event);

        for (let i = 0; i < this.rectangles.length; i++) {
            if (this.rectangles[i].topLeft.x < x && this.rectangles[i].topRight.x > x && this.rectangles[i].topLeft.y < y && this.rectangles[i].bottomLeft.y > y) {
                console.log(this.rectangles[i].actionType);
            }
        }
    }

    private getRouteParams(): void {
        this.activatedRoute.params.pipe(
            first(),
        ).subscribe((params: { columnid: number, slideid: number }) => {
            this.columnID = params.columnid;
            this.slideID = params.slideid;

            this.getSlideFromStore();
        });
    }

    private getSlideFromStore(): void {
        if (this.columnID === 'undefined') { // jesli slajd z biblioteki
            this.store.pipe(
                select(selectSlideFromLibaryById(this.slideID)),
                first(),
            ).subscribe((slide: Slide) => {
                this.getBackgroundImageStyle(slide);
            });
        } else if (this.columnID >= 0) {  // jesli slajd z kolumny prezentacji
            this.store.pipe(
                select(selectColumnsState), // pobierz wszystkie kolumny
                first(),
            ).subscribe((columns: Column[]) => {
                // pobierz kolumne w ktorej znajduje sie slajd z docelowym id
                const column: Column = columns.find((column: Column) => {
                    return column.id == this.columnID;
                });

                // pobierz slajd do edycji
                this.getSlideToEdit(column).then((slide: Slide) => {
                    this.getBackgroundImageStyle(slide);
                });
            });
        }
    }

    private getSlideToEdit(column: Column): Promise<Slide> {
        return new Promise<Slide>((resolve) => {
            column.slides.forEach((slide: Slide) => {
                if (slide.id == this.slideID) {
                    resolve(slide);
                    this.slide = slide;
                }
            });
        });
    }

    private getBackgroundImageStyle(slide: Slide) {
        this.backgroundImageStyle = this.domSanitizer.bypassSecurityTrustStyle(`background-image: url(${slide.imageData})`);
        this.changeDetectorRef.detectChanges();
    }

    private getCursorPosition(event: MouseEvent): { x: number, y: number } {
        const rect = this.canvasElement.nativeElement.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        return { x, y };
    }

    private drawRectangle(): void {
        this.context.beginPath();
        this.context.setLineDash([ 5, 5 ]);
        this.context.lineWidth = 1;
        this.context.strokeStyle = 'black';
        this.context.rect(this.startCords.x, this.startCords.y, this.endCords.x - this.startCords.x, this.endCords.y - this.startCords.y);
        this.context.stroke();
    }
}
