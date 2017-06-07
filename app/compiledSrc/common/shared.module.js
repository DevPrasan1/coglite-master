"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// External imports
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var material_1 = require("@angular/material");
var ng2_clipboard_1 = require("ng2-clipboard");
var router_1 = require("@angular/router");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var angular2_toaster_1 = require("angular2-toaster");
// Internal imports
var header_component_1 = require("../common/header/header.component");
var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
SharedModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule,
            common_1.CommonModule,
            material_1.MaterialModule,
            angular2_toaster_1.ToasterModule,
            ng2_bootstrap_1.BsDropdownModule.forRoot(),
            ng2_bootstrap_1.TypeaheadModule.forRoot(),
            ng2_bootstrap_1.CollapseModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule
        ],
        declarations: [
            header_component_1.HeaderComponent
        ],
        providers: [
            ng2_clipboard_1.ClipboardService,
            angular2_toaster_1.ToasterService
        ],
        exports: [
            header_component_1.HeaderComponent,
            forms_1.FormsModule,
            common_1.CommonModule,
            material_1.MaterialModule,
            angular2_toaster_1.ToasterModule,
            ng2_bootstrap_1.BsDropdownModule,
            ng2_bootstrap_1.TypeaheadModule,
            forms_1.ReactiveFormsModule
        ],
        entryComponents: []
    })
], SharedModule);
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map