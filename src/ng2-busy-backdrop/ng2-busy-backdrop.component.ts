import {Component} from "@angular/core";
import {Ng2PromiseTrackerService} from "../ng2-promise-tracker.service";

@Component({
	selector: 'ng2-busy-backdrop',
	template: `<div class="ng-busy-backdrop" [hidden]="!isActive()" [ngClass]="{'ng-busy-show': isActive(), 'ng-busy-hidden': !isActive()}"></div>`
})
export class Ng2BusyBackdropComponent {

	constructor(private tracker: Ng2PromiseTrackerService) {}

	isActive() {
		return this.tracker.isActive();
	}
}
