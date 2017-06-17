import {Subscription} from "rxjs/Subscription";

export const NG2_BUSY_CONFIG_DEFAULTS = {
	template: `
        <div class="ng-busy-default-wrapper">
        	<div class="ng-busy-default-text">{{message}}</div>
        </div>
    `,
	delay: 0,
	minDuration: 0,
	backdrop: true,
	message: 'Please wait...',
	wrapperClass: 'ng-busy'
};

export class Ng2BusyConfig implements INg2BusyConfig {
	template: string;
	delay: number;
	minDuration: number;
	backdrop: boolean;
	message: string;
	wrapperClass: string;

	constructor(config: INg2BusyConfig = {}) {
		for (let option in NG2_BUSY_CONFIG_DEFAULTS) {
			this[option] = config[option] != null ? config[option] : NG2_BUSY_CONFIG_DEFAULTS[option];
		}
	}
}

export interface INg2BusyConfig {
	template?: string;
	delay?: number;
	minDuration?: number;
	backdrop?: boolean;
	message?: string;
	wrapperClass?: string;
	busy?: Promise<any> | Subscription | Array<Promise<any> | Subscription>
}
