"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// External imports
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var core_2 = require("@angular/core");
var $ = require("jquery");
require("@progress/kendo-ui");
// for use ControlValueAccessor we must have to provide NG_VALUE_ACCESSOR as provider refer link for details
// https://blog.thoughtram.io/angular/2016/07/27/custom-form-controls-in-angular-2.html
var HTML_EDITOR_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_2.forwardRef(function () { return HTMLEditorComponent; }),
    multi: true
};
// this is global variable only for current scope not for entire application
// we are using this variable for creating unique id for html editor
var counter = 0; // set initial value
var HTMLEditorComponent = (function () {
    function HTMLEditorComponent() {
        this.onModelChange = function (_) { };
        this.onModelTouched = function () { };
        this.defaultStyles = {
            height: '500',
            width: '700',
        };
    }
    HTMLEditorComponent.prototype.writeValue = function (value) {
        if (value !== undefined) {
            this.model = value;
            var editor = $('#' + this.editorId).data('kendoEditor');
            editor.value(this.model);
        }
    };
    ;
    HTMLEditorComponent.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    ;
    HTMLEditorComponent.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    ;
    HTMLEditorComponent.prototype.ngOnInit = function () {
        this.styles = Object.assign(this.defaultStyles, this.styles);
        this.editorId = "Editor-" + counter++; // set initial value with increament counter variable
    };
    HTMLEditorComponent.prototype.ngAfterViewInit = function () {
        var self = this;
        $('#' + this.editorId).kendoEditor({
            change: function () {
                self.onEditorUpdate();
            },
            execute: function (e) {
                self.onEditorUpdate();
            },
            keyup: function (e) {
                self.onEditorUpdate();
            },
            select: function (e) {
                self.onEditorUpdate();
            }
        });
    };
    HTMLEditorComponent.prototype.onEditorUpdate = function () {
        this.editor = $('#' + this.editorId).data('kendoEditor');
        this.model = this.editor.value();
        this.onModelChange(this.model);
    };
    return HTMLEditorComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HTMLEditorComponent.prototype, "styles", void 0);
HTMLEditorComponent = __decorate([
    core_1.Component({
        selector: 'html-editor',
        moduleId: module.id.replace('/compiledSrc', ''),
        providers: [HTML_EDITOR_VALUE_ACCESSOR],
        templateUrl: 'html-editor.component.html',
        styleUrls: ['html-editor.component.css']
    })
], HTMLEditorComponent);
exports.HTMLEditorComponent = HTMLEditorComponent;
//# sourceMappingURL=html-editor.component.js.map