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
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms");
var license_service_1 = require("../license.service");
var common_services_1 = require("../../../../common/common.services");
var moment = require("moment");
// confirmation Dialog
var LicenseDialog = (function () {
    function LicenseDialog(dialogRef, licenSer, messageService) {
        this.dialogRef = dialogRef;
        this.licenSer = licenSer;
        this.messageService = messageService;
        // Lookup Data variables
        this.lookup = [];
        this.licenseInfomation = this.dialogRef.config.data.licenseDetail;
    }
    // formatter create and Update date 
    LicenseDialog.prototype.getCreateAndupdateDate = function () {
        var tz = 'America/New_York'; // or whatever your time zone is
        if (this.licenseInfomation.createdDate !== undefined && this.licenseInfomation.createdDate !== '') {
            this.disCreatedDate = moment(this.licenseInfomation.createdDate).format('MM/DD/YY hh:mm A');
        }
        if (this.licenseInfomation.updatedDate !== undefined && this.licenseInfomation.updatedDate !== '') {
            this.disCreatedDate = moment(this.licenseInfomation.updatedDate).format('MM/DD/YY hh:mm A');
        }
    };
    // close Dialog
    LicenseDialog.prototype.close = function () {
        this.dialogRef.close(false);
    };
    /*
     *  save Update Data And call save Api
     */
    LicenseDialog.prototype.save = function (licenseInfo) {
        var _this = this;
        var self = this;
        var licenseInfo1 = {};
        if (this.licenseDialog.form.valid && licenseInfo.subscriptionYear !== undefined) {
            if (licenseInfo.package.toUpperCase() === 'FREE') {
                licenseInfo.subscriptionType = 'FREE';
            }
            else {
                licenseInfo.subscriptionType = 'ANNUAL';
            }
            if (licenseInfo.storage !== undefined && licenseInfo.storage !== 0) {
                licenseInfo.storage = licenseInfo.storage * 1024;
            }
            this.licenSer.saveInfo(licenseInfo).subscribe(function (response) {
                self.dialogRef.close(true);
                var msg = { 'type': 'success', 'message': 'subscription saved successfully', 'locale': 'LOGINLOGFUNC_LOGGEDSUCCESS' };
                _this.messageService.showMessage(msg);
            }, function (error) {
                self.dialogRef.close(false);
                console.log(error);
            });
        }
    };
    ;
    LicenseDialog.prototype.ngOnInit = function () {
        var _this = this;
        this.licenSer.getLookup(['taxbook']).subscribe(function (response) {
            _this.lookup = response;
        }, function (error) {
            console.log(error);
        });
        this.licenSer.getplans().subscribe(function (response) {
            _this.plane = response.plans;
        }, function (error) {
            console.log(error);
        });
        this.getCreateAndupdateDate();
    };
    ;
    return LicenseDialog;
}());
__decorate([
    core_1.ViewChild('licenseDialog'),
    __metadata("design:type", forms_1.NgForm)
], LicenseDialog.prototype, "licenseDialog", void 0);
LicenseDialog = __decorate([
    core_1.Component({
        moduleId: module.id.replace('/compiledSrc', ''),
        selector: 'license-dialog',
        templateUrl: 'license-dialog.component.html',
        styleUrls: ['license-dialog.component.css']
    }),
    __metadata("design:paramtypes", [material_1.MdDialogRef, license_service_1.LicenseService, common_services_1.MessageService])
], LicenseDialog);
exports.LicenseDialog = LicenseDialog;
//# sourceMappingURL=license-dialog.component.js.map