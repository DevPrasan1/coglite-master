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
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var textMaskCore_1 = require("text-mask-core/dist/textMaskCore");
exports.MASKEDINPUT_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MaskedInputDirective; }),
    multi: true
};
var MaskedInputDirective = (function () {
    function MaskedInputDirective(renderer, element) {
        this.renderer = renderer;
        this.element = element;
        this.totalDigit = 0;
        this.linkOptions = {
            'maskDefinitions': {
                '9': /\d/,
                'A': /[a-zA-Z]/,
                '*': /[a-zA-Z0-9]/
            }
        };
        this.appTextMask = {
            mask: [],
            guide: true,
            placeholderChar: '_',
            pipe: undefined,
            keepCharPositions: false,
        };
        this._onTouched = function () { };
        this._onChange = function (_) { };
    }
    MaskedInputDirective.prototype.ngOnChanges = function (changes) {
        this.setupMask();
        if (this.textMaskInputElement !== undefined) {
            this.textMaskInputElement.update(this.inputElement.value);
        }
    };
    ;
    // onBlurMethod For set Blank value if user not write all Digit Of Regex
    MaskedInputDirective.prototype.onBlurMethod = function () {
        var CurrentValue = this.inputElement.value.match(/\d/g);
        if (CurrentValue === undefined || CurrentValue === null || CurrentValue.length < this.totalDigit) {
            this.renderer.setElementProperty(this.inputElement, 'value', '');
        }
    };
    ;
    // set masking on Fields
    MaskedInputDirective.prototype.writeValue = function (value) {
        if (!this.inputElement) {
            this.setupMask();
        }
        // set the initial value for cases where the mask is disabled
        var normalizedValue = value == null ? '' : value;
        this.renderer.setElementProperty(this.inputElement, 'value', normalizedValue);
        if (this.textMaskInputElement !== undefined) {
            this.textMaskInputElement.update(value);
        }
    };
    MaskedInputDirective.prototype.registerOnChange = function (fn) { this._onChange = fn; };
    MaskedInputDirective.prototype.registerOnTouched = function (fn) { this._onTouched = fn; };
    MaskedInputDirective.prototype.setDisabledState = function (isDisabled) {
        this.renderer.setElementProperty(this.element.nativeElement, 'disabled', isDisabled);
    };
    MaskedInputDirective.prototype.onInput = function (value) {
        if (!this.inputElement) {
            this.setupMask();
        }
        if (this.textMaskInputElement !== undefined) {
            this.textMaskInputElement.update(value);
            // get the updated value
            value = this.inputElement.value;
            // check against the last value to prevent firing ngModelChange despite no changes
            if (this.lastValue !== value) {
                this.lastValue = value;
                this._onChange(value);
            }
        }
    };
    ;
    // set Mask
    MaskedInputDirective.prototype.setupMask = function () {
        if (this.element.nativeElement.tagName === 'INPUT') {
            // `textMask` directive is used directly on an input element
            this.inputElement = this.element.nativeElement;
        }
        else {
            // `textMask` directive is used on an abstracted input element, `ion-input`, `md-input`, etc
            this.inputElement = this.element.nativeElement.getElementsByTagName('INPUT')[0];
        }
        var maskPatterns = [];
        this.totalDigit = 0;
        // get Total Digit and Convert into Regex
        for (var i = 0; i < this.appTextMask.mask.length; i++) {
            if (this.linkOptions.maskDefinitions[this.appTextMask.mask[i]] !== undefined) {
                maskPatterns.push(this.linkOptions.maskDefinitions[this.appTextMask.mask[i]]);
                this.totalDigit++;
            }
            else {
                maskPatterns.push(this.appTextMask.mask[i]);
            }
        }
        this.appTextMask.mask = maskPatterns;
        if (this.inputElement) {
            this.textMaskInputElement = textMaskCore_1.createTextMaskInputElement(Object.assign({ inputElement: this.inputElement }, this.appTextMask));
        }
    };
    return MaskedInputDirective;
}());
__decorate([
    core_1.Input('appTextMask'),
    __metadata("design:type", Object)
], MaskedInputDirective.prototype, "appTextMask", void 0);
__decorate([
    core_1.HostListener('blur'),
    __metadata("design:type", Object)
], MaskedInputDirective.prototype, "_onTouched", void 0);
__decorate([
    core_1.HostListener('blur'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MaskedInputDirective.prototype, "onBlurMethod", null);
__decorate([
    core_1.HostListener('input'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MaskedInputDirective.prototype, "onInput", null);
MaskedInputDirective = __decorate([
    core_1.Directive({
        selector: '[appTextMask]',
        providers: [exports.MASKEDINPUT_VALUE_ACCESSOR]
    }),
    __metadata("design:paramtypes", [core_1.Renderer, core_1.ElementRef])
], MaskedInputDirective);
exports.MaskedInputDirective = MaskedInputDirective;
var TextMaskModule = (function () {
    function TextMaskModule() {
    }
    return TextMaskModule;
}());
TextMaskModule = __decorate([
    core_1.NgModule({
        declarations: [MaskedInputDirective],
        exports: [MaskedInputDirective]
    })
], TextMaskModule);
exports.TextMaskModule = TextMaskModule;
var textMaskCore_2 = require("text-mask-core/dist/textMaskCore");
exports.conformToMask = textMaskCore_2.conformToMask;
//# sourceMappingURL=common.directive.js.map