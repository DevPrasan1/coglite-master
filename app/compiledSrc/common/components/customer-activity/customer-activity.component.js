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
var _ = require("lodash");
// Internal Imports
var customer_service_1 = require("../../../customer/customer.service");
var activity_new_component_1 = require("../../../activity/dialogs/activity-new/activity-new.component");
var common_services_1 = require("../../../common/common.services");
/*
 * How to use this component : <customer-contact [CustomerID]="CustomerID"></customer-contact>
 */
var CustomerActivityComponent = (function () {
    function CustomerActivityComponent(customerService, _dialogService, viewContainerRef, localStorageUtilityService) {
        this.customerService = customerService;
        this._dialogService = _dialogService;
        this.viewContainerRef = viewContainerRef;
        this.localStorageUtilityService = localStorageUtilityService;
        //
        this.buttonCount = 5;
        this.info = true;
        this.type = 'numeric';
        this.pageSizes = [50, 100, 250, 500, 1000];
        this.previousNext = true;
        this.isDataLoading = false;
        // set default sort order
        this.sortDescriptor = [{ dir: 'asc', field: 'contactPersonName' }];
        // handle state change event
        this.activityGridState = {
            sort: this.sortDescriptor,
            skip: 0,
            take: 50
        };
        this.customerCardActivitySearch = {};
    }
    // when row selection is changed
    CustomerActivityComponent.prototype.selectionChange = function (e) {
        var addIndex = ((this.customerCardActivitySearch.pageNo - 1) * this.customerCardActivitySearch.pageSize);
        var width = 1300;
        var height = 980;
        var left = 200;
        var top = 200;
        var windowFeatures = 'width=' + width + ',height=' + height + ',status,resizable,left=' + left + ',top=' + top + 'screenX=' + left +
            ',screenY=' + top + ',toolbar=no,scrollbars=no,menubar=no,resizable=yes,status=no, titlebar=no,location=no,dialog=yes,navigationbar=no;controlbox=no';
        window.open('/#/activityDetail/' + this.availableActivity.data[e.index - addIndex].id, 'Activity', windowFeatures);
    };
    CustomerActivityComponent.prototype._initAvailableActivity = function () {
        var _this = this;
        var self = this;
        // Todo : pass here dummy only for testing purpose, remove it afterwards
        this.isDataLoading = true;
        this.customerCardActivitySearch.customerID = this.customerId;
        if (this.activityGridState !== undefined && this.activityGridState.sort[0] !== undefined) {
            this.customerCardActivitySearch.sortExpression = this.activityGridState.sort[0].field;
            this.customerCardActivitySearch.sortDirection = this.activityGridState.sort[0].dir;
            this.customerCardActivitySearch.pageSize = this.activityGridState.take;
            if (this.activityGridState.skip === 0) {
                this.customerCardActivitySearch.pageNo = 1;
            }
            else if (this.activityGridState.skip >= 0) {
                this.customerCardActivitySearch.pageNo = (this.activityGridState.skip / this.activityGridState.take) + 1;
            }
        }
        if (this.customerId !== undefined) {
            this.customerService.getActivityList(this.customerCardActivitySearch).subscribe(function (response) {
                _this.availableActivity = {
                    data: response,
                    total: response ? (response.length > 0 ? response[0].total : 0) : 0
                };
                _this.localStorageUtilityService.addToLocalStorage('searchActivityData', JSON.stringify(_this.availableActivity));
                var openActivityCount = _.filter(response, function (element) {
                    // return (element.status.toLowerCase() != 'close' && element.status.toLowerCase() != 'close bookmark'
                    // && element.status.toLowerCase() != 'vpbx import' && element.status.toLowerCase() != 'w/f mantis fut.' && element.status.toLowerCase() != 'cancel' &&
                    // element.status.toLowerCase() != 'w/t close' && element.status.toLowerCase() != 'sent' && element.status.toLowerCase() != 'training comp.')
                });
                if (openActivityCount !== undefined) {
                    _this.openActivityCount = openActivityCount.length;
                }
                else {
                    _this.openActivityCount = 0;
                }
                _this.isDataLoading = false;
                if (_this.availableActivity.data.length > 0) {
                    _this.GTotalCount = _this.availableActivity.data.length;
                }
                else {
                    // no data
                }
                self.isDataLoading = false;
            }, function (error) {
                console.log(error);
                self.isDataLoading = false;
            });
        }
    };
    ;
    CustomerActivityComponent.prototype.sortChange = function (sort) {
        this.activityGridState.sort = sort;
        this._initAvailableActivity();
    };
    ;
    CustomerActivityComponent.prototype.pageChange = function (event) {
        this.activityGridState.take = event.take;
        this.activityGridState.skip = event.skip;
        this._initAvailableActivity();
    };
    // open dialog for contact details
    CustomerActivityComponent.prototype.activityNew = function () {
        var self = this;
        // open dialog
        this._dialogService
            .custom(activity_new_component_1.ActivityNewComponent, {
            'title': 'Contact Detail', 'data': {
                'customerId': this.customerId
            }
        }, this.viewContainerRef)
            .subscribe(function (result) { }, function (error) { console.log(error); });
    };
    ;
    CustomerActivityComponent.prototype.ngOnInit = function () {
        this._initAvailableActivity();
    };
    return CustomerActivityComponent;
}());
__decorate([
    core_1.Input('customerId'),
    __metadata("design:type", String)
], CustomerActivityComponent.prototype, "customerId", void 0);
CustomerActivityComponent = __decorate([
    core_1.Component({
        selector: 'customer-activity',
        moduleId: module.id.replace('/compiledSrc', ''),
        templateUrl: 'customer-activity.component.html',
        styleUrls: ['customer-activity.component.css']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof customer_service_1.CustomerService !== "undefined" && customer_service_1.CustomerService) === "function" && _a || Object, common_services_1.DialogService,
        core_1.ViewContainerRef, common_services_1.LocalStorageUtilityService])
], CustomerActivityComponent);
exports.CustomerActivityComponent = CustomerActivityComponent;
var _a;
//# sourceMappingURL=customer-activity.component.js.map