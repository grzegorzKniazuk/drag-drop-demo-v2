
export abstract class Droppable {

    public allowDrop(event: DragEvent): void {
        event.preventDefault();
    }
}
