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
var MULTISELECT_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return MultiselectDropdown; }),
    multi: true
};
var MultiSelectSearchFilter = (function () {
    function MultiSelectSearchFilter() {
    }
    MultiSelectSearchFilter.prototype.transform = function (options, args) {
        if (options == undefined) {
            options = [];
        }
        return options.filter(function (option) {
            return option.name
                .toLowerCase()
                .indexOf((args || '').toLowerCase()) > -1;
        });
    };
    return MultiSelectSearchFilter;
}());
MultiSelectSearchFilter = __decorate([
    core_1.Pipe({
        name: 'searchFilter'
    })
], MultiSelectSearchFilter);
exports.MultiSelectSearchFilter = MultiSelectSearchFilter;
var MultiselectDropdown = (function () {
    function MultiselectDropdown(element, differs) {
        this.element = element;
        this.differs = differs;
        this.selectionLimitReached = new core_1.EventEmitter();
        this.dropdownClosed = new core_1.EventEmitter();
        this.numSelected = 0;
        this.isVisible = false;
        this.searchFilterText = '';
        this.defaultSettings = {
            pullRight: false,
            enableSearch: false,
            checkedStyle: 'checkboxes',
            selectionLimit: 0,
            closeOnSelect: false,
            autoUnselect: false,
            showCheckAll: false,
            showUncheckAll: false,
            dynamicTitleMaxItems: 3,
            maxHeight: '300px',
        };
        this.defaultTexts = {
            checkAll: 'Select All',
            uncheckAll: 'Select None',
            checked: 'checked',
            checkedPlural: 'checked',
            searchPlaceholder: 'Search...',
            defaultTitle: 'Select',
        };
        this.onModelChange = function (_) { };
        this.onModelTouched = function () { };
        this.differ = differs.find([]).create(null);
    }
    MultiselectDropdown.prototype.onClick = function (target) {
        var parentFound = false;
        while (target != null && !parentFound) {
            if (target === this.element.nativeElement) {
                parentFound = true;
            }
            target = target.parentElement;
        }
        if (!parentFound) {
            this.searchFilterText = ''; // temp patch
            this.isVisible = false;
        }
    };
    MultiselectDropdown.prototype.ngOnInit = function () {
        this.settings = Object.assign(this.defaultSettings, this.settings);
        this.texts = Object.assign(this.defaultTexts, this.texts);
        this.title = this.texts.defaultTitle;
        this.placeHolderTitle = this.title;
    };
    MultiselectDropdown.prototype.writeValue = function (value) {
        if (value !== undefined) {
            this.model = value;
        }
    };
    MultiselectDropdown.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    MultiselectDropdown.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    MultiselectDropdown.prototype.ngDoCheck = function () {
        var changes = this.differ.diff(this.model);
        if (changes) {
            this.updateNumSelected();
            this.updateTitle();
        }
    };
    MultiselectDropdown.prototype.clearSearch = function () {
        this.searchFilterText = '';
    };
    MultiselectDropdown.prototype.toggleDropdown = function () {
        this.isVisible = !this.isVisible;
        if (!this.isVisible) {
            this.dropdownClosed.emit();
        }
    };
    MultiselectDropdown.prototype.isSelected = function (option) {
        return this.model && this.model.indexOf(option.id) > -1;
    };
    MultiselectDropdown.prototype.setSelected = function (event, option) {
        this.onModelChange(this.model);
    };
    MultiselectDropdown.prototype.updateNumSelected = function () {
        this.numSelected = this.model && this.model.length || 0;
    };
    MultiselectDropdown.prototype.updateTitle = function () {
        var _this = this;
        if (this.numSelected === 0) {
            this.title = this.texts.defaultTitle;
        }
        else if (this.settings.dynamicTitleMaxItems >= this.numSelected) {
            this.title = this.options
                .filter(function (option) {
                return _this.model && _this.model.indexOf(option.id) > -1;
            })
                .map(function (option) { return option.name; })
                .join(', ');
        }
        else {
            this.title = this.numSelected
                + ' '
                + (this.numSelected === 1 ? this.texts.checked : this.texts.checkedPlural);
        }
    };
    MultiselectDropdown.prototype.checkAll = function () {
        this.model = this.options.map(function (option) { return option.id; });
        this.onModelChange(this.model);
    };
    MultiselectDropdown.prototype.uncheckAll = function () {
        this.model = [];
        this.onModelChange(this.model);
    };
    return MultiselectDropdown;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], MultiselectDropdown.prototype, "options", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MultiselectDropdown.prototype, "settings", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MultiselectDropdown.prototype, "texts", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], MultiselectDropdown.prototype, "selectionLimitReached", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], MultiselectDropdown.prototype, "dropdownClosed", void 0);
__decorate([
    core_1.HostListener('document: click', ['$event.target']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [HTMLElement]),
    __metadata("design:returntype", void 0)
], MultiselectDropdown.prototype, "onClick", null);
MultiselectDropdown = __decorate([
    core_1.Component({
        selector: 'ss-multiselect-dropdown',
        moduleId: module.id.replace('/compiledSrc', ''),
        providers: [MULTISELECT_VALUE_ACCESSOR],
        templateUrl: 'md-multiselect-dropdown.components.html',
        styleUrls: ['md-multiselect-dropdown.components.css']
    }),
    __metadata("design:paramtypes", [core_1.ElementRef,
        core_1.IterableDiffers])
], MultiselectDropdown);
exports.MultiselectDropdown = MultiselectDropdown;
;
//# sourceMappingURL=md-multiselect-dropdown.components.js.map