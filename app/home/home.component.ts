import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id.replace('/compiledSrc', ''),
    selector: 'home',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}