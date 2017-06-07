"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// external imports
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var md2_1 = require("md2");
//
var md_multiselect_dropdown_components_1 = require("./md-multiselect-dropdown.components");
var MultiselectDropdownModule = (function () {
    function MultiselectDropdownModule() {
    }
    return MultiselectDropdownModule;
}());
MultiselectDropdownModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule, forms_1.FormsModule, md2_1.Md2Module, material_1.MaterialModule],
        exports: [md_multiselect_dropdown_components_1.MultiselectDropdown],
        declarations: [md_multiselect_dropdown_components_1.MultiselectDropdown, md_multiselect_dropdown_components_1.MultiSelectSearchFilter],
    })
], MultiselectDropdownModule);
exports.MultiselectDropdownModule = MultiselectDropdownModule;
//# sourceMappingURL=md-multiselect-dropdown.module.js.map