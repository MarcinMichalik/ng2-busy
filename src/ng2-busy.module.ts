import {CommonModule} from "@angular/common";
import {ModuleWithProviders, NgModule} from "@angular/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {Ng2BusyBackdropComponent} from "./ng2-busy-backdrop.component";
import {Ng2BusyComponent} from "./ng2-busy-component";
import {Ng2BusyConfig} from "./ng2-busy-config";
import {Ng2BusyDirective} from "./ng2-busy.directive";

import {Ng2BusyService} from "./ng2-busy.service";

@NgModule({
	imports: [
		CommonModule,
		BrowserAnimationsModule
	],
	declarations: [
		Ng2BusyDirective,
		Ng2BusyComponent,
		Ng2BusyBackdropComponent,
	],
	providers: [
		Ng2BusyService
	],
	exports: [Ng2BusyDirective],
	entryComponents: [
		Ng2BusyComponent,
		Ng2BusyBackdropComponent
	]
})
export class Ng2BusyModule {
	static forRoot(config: Ng2BusyConfig): ModuleWithProviders {
		return {
			ngModule: Ng2BusyModule,
			providers: [
				{provide: Ng2BusyConfig, useValue: config}
			]
		};
	}
}
