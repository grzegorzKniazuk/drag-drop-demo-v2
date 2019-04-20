import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'dd-presentation-thumbnail',
    templateUrl: './presentation-thumbnail.component.html',
    styleUrls: [ './presentation-thumbnail.component.scss' ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PresentationThumbnailComponent {
}
