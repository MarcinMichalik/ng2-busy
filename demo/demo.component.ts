import {Component} from "@angular/core";
import {Http} from "@angular/http";


@Component({
    selector: 'demo-app',
    templateUrl: './demo.component.html'
})
export class DemoComponent{
	busyConfig = {
		busy: null,
		message: 'My message',
		backdrop: true
	};

	busy;

	constructor(private http: Http){}

	start() {
		this.busy = this.http.get('https://httpbin.org/delay/3000').subscribe();
	}

	startCustom(){
		this.busyConfig.busy = this.http.get('https://httpbin.org/delay/3000').subscribe();
	}
}
