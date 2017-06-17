import {Injectable, Optional} from "@angular/core";
import {Ng2BusyConfig} from "./ng2-busy-config";

@Injectable()
export class Ng2BusyService{
	config: Ng2BusyConfig;

	constructor(@Optional() config: Ng2BusyConfig) {
		this.config = config || new Ng2BusyConfig();
	}
}
