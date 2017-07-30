import {
	ComponentFactoryResolver, ComponentRef, Directive, DoCheck, Injector, Input,
	ViewContainerRef
} from '@angular/core';
import { Ng2PromiseTrackerService } from './ng2-promise-tracker.service';
import { Subscription } from 'rxjs/Subscription';
import { Ng2BusyService } from './ng2-busy.service';
import { equals } from './util';
import { INg2BusyConfig } from './ng2-busy-config';
import {Ng2BusyComponent} from "./ng2-busy/ng2-busy-component";
import {Ng2BusyBackdropComponent} from "./ng2-busy-backdrop/ng2-busy-backdrop.component";
/**
 * ### Syntax
 *
 * - `<div [ng2Busy]="busy">...</div>`
 * - `<div [ng2Busy]="[busyA, busyB, busyC]">...</div>`
 * - `<div [ng2Busy]="{busy: busy, message: 'Loading...', backdrop: false, delay: 200, minDuration: 600}">...</div>`
 */
@Directive({
	selector: '[ng-busy]',
	providers: [Ng2PromiseTrackerService]
})
export class Ng2BusyDirective implements DoCheck {
	@Input('ng-busy') options: any;
	optionsRecord: any;
	optionsNorm: INg2BusyConfig;
	template: string;
	backdrop: boolean;
	private busyRef: ComponentRef<Ng2BusyComponent>;
	private backdropRef: ComponentRef<Ng2BusyBackdropComponent>;

	constructor(
		private service: Ng2BusyService,
		private tracker: Ng2PromiseTrackerService,
		private cfResolver: ComponentFactoryResolver,
		private vcRef: ViewContainerRef,
		private injector: Injector
	) { }

	// As ngOnChanges does not work on Object detection, ngDoCheck is using
	ngDoCheck() {
		const options = this.optionsNorm = this.normalizeOptions(this.options);

		if (!this.dectectOptionsChange()) {
			return;
		}

		if (this.busyRef) {
			this.busyRef.instance.message = options.message;
		}

		!equals(options.busy, this.tracker.promiseList) && this.tracker.reset({
			promiseList: options.busy,
			delay: options.delay,
			minDuration: options.minDuration
		});

		if (!this.busyRef
			|| this.template !== options.template
			|| this.backdrop !== options.backdrop
		) {
			this.destroyComponents();

			this.template = options.template;
			this.backdrop = options.backdrop;

			options.backdrop && this.createBackdrop();

			this.createBusy();
		}
	}

	ngOnDestroy() {
		this.destroyComponents();
	}

	private destroyComponents() {
		this.busyRef && this.busyRef.destroy();
		this.backdropRef && this.backdropRef.destroy();
	}

	private createBackdrop() {
		const backdropFactory = this.cfResolver.resolveComponentFactory(Ng2BusyBackdropComponent);
		this.backdropRef = this.vcRef.createComponent(backdropFactory, null, this.injector);
	}

	private createBusy() {
		const busyFactory = this.cfResolver.resolveComponentFactory(Ng2BusyComponent);
		this.busyRef = this.vcRef.createComponent(busyFactory, null, this.injector);

		const {message, wrapperClass, template} = this.optionsNorm;
		const instance = this.busyRef.instance;
		instance.message = message;
		instance.wrapperClass = wrapperClass;
		instance.template = template;
	}

	private normalizeOptions(options: any) {
		if (!options) {
			options = {busy: null};
		} else if (Array.isArray(options)
			|| options instanceof Promise
			|| options instanceof Subscription
		) {
			options = {busy: options};
		}
		options = Object.assign({}, this.service.config, options);
		if (!Array.isArray(options.busy)) {
			options.busy = [options.busy];
		}

		return options;
	}

	private dectectOptionsChange() {
		if (equals(this.optionsNorm, this.optionsRecord)) {
			return false;
		}
		this.optionsRecord = this.optionsNorm;
		return true;
	}
}
