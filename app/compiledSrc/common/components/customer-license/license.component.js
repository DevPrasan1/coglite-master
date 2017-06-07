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
// External Imports
var core_1 = require("@angular/core");
var common_services_1 = require("../../../common/common.services");
// Internal Imports
var customer_service_1 = require("../../../customer/customer.service");
var license_dialog_component_1 = require("./license-dialog/license-dialog.component");
/*
 * How to use this component : <licence-contact [CustomerID]="CustomerID"></licence-contact>
 */
var LicenseComponent = (function () {
    function LicenseComponent(customerService, _dialogService, viewContainerRef) {
        this.customerService = customerService;
        this._dialogService = _dialogService;
        this.viewContainerRef = viewContainerRef;
    }
    // Function for Open Lincese dialog
    LicenseComponent.prototype.openlicenseCard = function (selectedRow) {
        var _this = this;
        this.licenseDetail.data[selectedRow.index].customerId = this.customerId;
        this.licenseDetail.data[selectedRow.index].showAlert = false;
        this.licenseDetail.data[selectedRow.index].showContinue = false;
        this.licenseDetail.data[selectedRow.index].source = 'CRM';
        // Parse data With New Reference
        var currentData = JSON.parse(JSON.stringify(this.licenseDetail.data[selectedRow.index]));
        // Open dialog
        this._dialogService.custom(license_dialog_component_1.LicenseDialog, {
            'title': 'License Detail', 'customHtml': './Lincese/license.component.html',
            'data': {
                'licenseDetail': currentData,
                'index': selectedRow
            }
        }, this.viewContainerRef).subscribe(function (result) {
            if (result === true) {
                _this._getData();
            }
        }, function (error) {
            console.log(error);
        });
    };
    ;
    // Update Data Show in Ui
    LicenseComponent.prototype.showPlanData = function () {
        // Get and show plan data on UI
        for (var i in this.licenseDetail.data) {
            if (this.licenseDetail.data[i]['storage'] !== undefined && this.licenseDetail.data[i]['storage'] !== 0) {
                if (this.licenseDetail.data[i]['package'].toUpperCase() === 'FREE') {
                    this.licenseDetail.data[i]['storage'] = parseFloat((this.licenseDetail.data[i]['storage'] / 1024).toFixed(2));
                }
                else {
                    this.licenseDetail.data[i]['storage'] = (this.licenseDetail.data[i]['storage'] / 1024);
                }
            }
            else {
                this.licenseDetail.data[i]['storage'] = undefined;
            }
        }
    };
    // Get Licese Data from Api
    LicenseComponent.prototype._getData = function () {
        var _this = this;
        var self = this;
        this.customerService.getsubscriptionList(this.customerId).subscribe(function (response) {
            self.licenseDetail = {
                data: response.LicenseStatus,
                total: response ? (response.length > 0 ? response[0].total : 0) : 0
            };
            _this.showPlanData();
        }, function (error) {
            console.log(error);
        });
    };
    // First call ngOnInit Then get Lincese
    LicenseComponent.prototype.ngOnInit = function () {
        this._getData();
    };
    ;
    return LicenseComponent;
}());
__decorate([
    core_1.Input('customerId'),
    __metadata("design:type", String)
], LicenseComponent.prototype, "customerId", void 0);
LicenseComponent = __decorate([
    core_1.Component({
        selector: 'license-component',
        moduleId: module.id.replace('/compiledSrc', ''),
        templateUrl: 'license.component.html'
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof customer_service_1.CustomerService !== "undefined" && customer_service_1.CustomerService) === "function" && _a || Object, common_services_1.DialogService, core_1.ViewContainerRef])
], LicenseComponent);
exports.LicenseComponent = LicenseComponent;
var _a;
//# sourceMappingURL=license.component.js.map