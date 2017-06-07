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
var ng2_clipboard_1 = require("ng2-clipboard");
var _ = require("lodash");
// Internal Imports
var customer_service_1 = require("../../../customer/customer.service");
var contact_service_1 = require("../../../contact/contact.service");
var contact_detail_component_1 = require("../../../contact/dialogs/contact-detail/contact-detail.component");
var common_services_1 = require("../../../common/common.services");
/*
 * How to use this component : <customer-contact [customerId]="customerId"></customer-contact>
 */
var CustomerContactComponent = (function () {
    function CustomerContactComponent(customerService, contactService, _dialogService, viewContainerRef, clipboard, messageService) {
        this.customerService = customerService;
        this.contactService = contactService;
        this._dialogService = _dialogService;
        this.viewContainerRef = viewContainerRef;
        this.clipboard = clipboard;
        this.messageService = messageService;
        this.status = ['Aktive', 'InAktive'];
        this.status_value = 'Aktive';
    }
    // when row selection is changed
    CustomerContactComponent.prototype.selectionChange = function (e) {
        console.log(this.availableContactPerson.data[e.index].id);
    };
    CustomerContactComponent.prototype.toClipboard = function (customer) {
        this.clipboard.copy(customer.firstName + '\n' + customer.lastName);
    };
    ;
    CustomerContactComponent.prototype.deleteContact = function () {
        var _this = this;
        var contactPersonToDelte = _.find(this.availableContactPerson.data, { 'isSelected': true });
        var self = this;
        if (contactPersonToDelte !== undefined) {
            // Open dialog for conformation before deleting contact data
            var dialog = this._dialogService.confirm('Confirm', 'Sind Sie sicher den Datensatz zu löschen?', { 'height': 'auto', 'width': 'auto' }, this.viewContainerRef).subscribe(function (result) {
                if (result === true) {
                    self.isDataLoading = true;
                    self.contactService.deleteContactDetails(contactPersonToDelte.id).subscribe(function (result2) {
                        self.isDataLoading = false;
                        // Show message when contact deleted successfully
                        var msg = { 'type': 'success', 'message': 'Contact deleted successfully', 'locale': 'LOGINLOGFUNC_LOGGEDSUCCESS' };
                        _this.messageService.showMessage(msg);
                        _this.getConatctPersionList();
                    }, function (error) { console.log(error); });
                }
            }, function (error) { self.isDataLoading = false; });
        }
        else {
            // not selected message.
            this._dialogService.notify('Aufmerksamkeit', 'Wählen Sie mindestens ein Element', {}, this.viewContainerRef)
                .subscribe(function (res) {
            }, function (error) {
            });
        }
    };
    ;
    // open dialog for contact details
    CustomerContactComponent.prototype.openContactCard = function (selectedRow) {
        var _this = this;
        var self = this;
        // open dialog
        this._dialogService
            .custom(contact_detail_component_1.ContactDetailComponent, { 'title': 'Contact Detail', 'customHtml': './contactDetail/contactDetail.component.html', 'data': { 'contact': this.availableContactPerson.data[selectedRow.index],
                'availableContact': this.availableContactPerson.data, 'index': selectedRow.index } }, this.viewContainerRef)
            .subscribe(function (result) { _this.getConatctPersionList(); }, function (error) { console.log(error); });
    };
    ;
    CustomerContactComponent.prototype.newContactPerson = function () {
        var _this = this;
        var contact = { 'customerId': this.customerId, 'isNew': true, 'isTestCustomer': this.isTestCustomer };
        this._dialogService
            .custom(contact_detail_component_1.ContactDetailComponent, { 'title': 'Contact Detail', 'customHtml': './contactDetail/contactDetail.component.html', 'data': { 'contact': contact } }, this.viewContainerRef)
            .subscribe(function (result) {
            _this.getConatctPersionList();
        }, function (error) { console.log(error); });
    };
    CustomerContactComponent.prototype.ngOnInit = function () {
        this.getConatctPersionList();
    };
    CustomerContactComponent.prototype.getConatctPersionList = function () {
        var self = this;
        // Todo : pass here dummy only for testing purpose, remove it afterwards
        if (this.customerId !== undefined) {
            this.isDataLoading = true;
            this.customerService.getContactPersonList({ 'customerId': this.customerId, 'isActive': this.status_value === 'Aktive' ? true : false }).subscribe(function (response) {
                self.availableContactPerson = {
                    data: response,
                    total: response ? (response.length > 0 ? response[0].total : 0) : 0
                };
                self.isDataLoading = false;
            }, function (error) {
                console.log(error);
                self.isDataLoading = false;
            });
        }
    };
    return CustomerContactComponent;
}());
__decorate([
    core_1.Input('customerId'),
    __metadata("design:type", String)
], CustomerContactComponent.prototype, "customerId", void 0);
__decorate([
    core_1.Input('isTestCustomer'),
    __metadata("design:type", Boolean)
], CustomerContactComponent.prototype, "isTestCustomer", void 0);
CustomerContactComponent = __decorate([
    core_1.Component({
        selector: 'customer-contact',
        moduleId: module.id.replace('/compiledSrc', ''),
        templateUrl: 'customer-contact.component.html',
        styleUrls: ['customer-contact.component.css']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof customer_service_1.CustomerService !== "undefined" && customer_service_1.CustomerService) === "function" && _a || Object, typeof (_b = typeof contact_service_1.ContactService !== "undefined" && contact_service_1.ContactService) === "function" && _b || Object, common_services_1.DialogService,
        core_1.ViewContainerRef, ng2_clipboard_1.ClipboardService, common_services_1.MessageService])
], CustomerContactComponent);
exports.CustomerContactComponent = CustomerContactComponent;
var _a, _b;
//# sourceMappingURL=customer-contact.component.js.map