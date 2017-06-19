import {Component} from "@angular/core";
import {Ng2PromiseTrackerService} from "./ng2-promise-tracker.service";
import {trigger, animate, transition, style} from '@angular/animations';

const inactiveStyle = style({
	opacity: 0,
});
const timing = '.3s ease';

@Component({
	selector: 'ng2-busy-backdrop',
	styleUrls: ['./ng2-busy-backdrop.component.css'],
	template: `
		<div class="ng-busy-backdrop"
			 @fadeInOut
			 *ngIf="isActive()">
		</div>
	`,
	animations: [
		trigger('fadeInOut', [
			transition('void => *', [
				inactiveStyle,
				animate(timing)
			]),
			transition('* => void', [
				animate(timing, inactiveStyle)
			])
		])
	]
})
export class Ng2BusyBackdropComponent {
	constructor(private tracker: Ng2PromiseTrackerService) {
	}

	isActive() {
		return this.tracker.isActive();
	}
}
