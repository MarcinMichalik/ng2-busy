import { Compiler, Component, DoCheck, NgModule, NgModuleFactory, OnDestroy } from '@angular/core';
import { trigger, animate, transition, style } from '@angular/animations';
import { Ng2PromiseTrackerService } from './ng2-promise-tracker.service';

const inactiveStyle = style({
	opacity: 0,
	transform: 'translateY(-40px)'
});
const timing = '.3s ease';

export interface Ng2BusyContext {
	message: string;
}

@Component({
	selector: 'ng2-busy',
	template: `
		<div [class]="wrapperClass" *ngIf="isActive()" @flyInOut>
			<ng-container *ngComponentOutlet="TemplateComponent; ngModuleFactory: nmf;"></ng-container>
		</div>
	`,
	animations: [
		trigger('flyInOut', [
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
export class Ng2BusyComponent implements DoCheck, OnDestroy {
	TemplateComponent;
	nmf: NgModuleFactory<any>;
	wrapperClass: string;
	template: string;
	message: string;
	private lastMessage: string;

	constructor(
		private tracker: Ng2PromiseTrackerService,
		private compiler: Compiler
	) {}

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
		const {template, message} = this;

		@Component({template})
		class TemplateComponent {
			message: string = message;
		}

		@NgModule({
			declarations: [TemplateComponent],
			entryComponents: [TemplateComponent]
		})
		class TemplateModule {}

		this.TemplateComponent = TemplateComponent;
		this.nmf = this.compiler.compileModuleSync(TemplateModule);
	}

	clearDynamicTemplateCache() {
		if (!this.nmf) {
			return;
		}

		this.compiler.clearCacheFor(this.nmf.moduleType);
		this.nmf = null;
	}

	isActive() {
		return this.tracker.isActive();
	}
}
