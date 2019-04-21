import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dd-presentation-creator',
    templateUrl: './presentation-creator.component.html',
    styleUrls: [ './presentation-creator.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationCreatorComponent {
}
