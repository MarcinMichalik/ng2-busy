import {Component} from "@angular/core";
import {Http} from "@angular/http";


@Component({
    selector: 'demo-app',
    templateUrl: './demo.component.html'
})
export class DemoComponent{
	busyConfig = {
		busy: null,
		message: 'Loading',
		backdrop: true,
		minDuration: 30000
	};

	constructor(private http: Http){}

	start() {
		this.busyConfig.busy = this.http.get('https://httpbin.org/delay/1').subscribe();
	}
}
