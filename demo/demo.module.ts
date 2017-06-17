import {NgModule} from '@angular/core';
import {DemoComponent} from './demo.component';
import {BrowserModule} from '@angular/platform-browser';
import {Ng2BusyModule} from "../src/ng2-busy.module";
import {HttpModule} from "@angular/http";

@NgModule({
    declarations: [
        DemoComponent
    ],
    imports: [
        BrowserModule,
		Ng2BusyModule,
		HttpModule
    ],
    bootstrap: [
        DemoComponent
    ]
})
export class DemoModule{

}
