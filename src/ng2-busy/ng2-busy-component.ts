import {Component, DoCheck, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {Ng2PromiseTrackerService} from "../ng2-promise-tracker.service";


export interface Ng2BusyContext {
	message: string;
}

@Component({
	selector: 'ng2-busy',
	template: `<div #wrapper [hidden]="!isActive()" [class]="wrapperClass"></div>`
})
export class Ng2BusyComponent implements DoCheck, OnDestroy {

	wrapperClass: string;
	template: string;
	message: string;
	private lastMessage: string;

	@ViewChild('wrapper') wrapper: ElementRef;

	constructor(private tracker: Ng2PromiseTrackerService){}

	ngDoCheck() {
		if (this.message === this.lastMessage) {
			return;
		}
		this.lastMessage = this.message;
		this.clearDynamicTemplateCache();
		this.createDynamicTemplate();
	}

	ngOnDestroy(): void {
		this.clearDynamicTemplateCache();
	}

	createDynamicTemplate() {
		this.wrapper.nativeElement.innerHTML = this.template.replace("{{message}}", this.message);
	}

	clearDynamicTemplateCache() {
		this.wrapper.nativeElement.innerHTML = '';
	}

	isActive() {
		return this.tracker.isActive();
	}
}
