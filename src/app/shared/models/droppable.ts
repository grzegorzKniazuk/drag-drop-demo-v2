export abstract class Droppable {
    public isElementOnDragOver: boolean;

    public allowDrop(event: DragEvent): void {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.isElementOnDragOver = true;
    }

    public onDragLeave(): void {
        this.isElementOnDragOver = false;
    }
}
