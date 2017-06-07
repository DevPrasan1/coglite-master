///<reference path="../node_modules/@types/node/index.d.ts"/>
///<reference path="../node_modules/@types/moment-timezone/index.d.ts"/>
///<reference path="../node_modules/@types/kendo-ui/index.d.ts"/>
import { Component, OnInit } from '@angular/core';
import { ToasterConfig, Toast, ToasterService } from 'angular2-toaster';


@Component({
     selector: 'my-app',
     moduleId: module.id.replace('/compiledSrc', ''),
     templateUrl: 'app.component.html',
})
export class AppComponent {
	// Initial toaster Configuration
    public toasterconfig: ToasterConfig =
      new ToasterConfig({
        showCloseButton: true
     });

    
}
