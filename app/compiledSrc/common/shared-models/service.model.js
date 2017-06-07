"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ServiceModel = (function () {
    function ServiceModel(customerId, addressId, name, name2, street, country, zipcode, city, telephone, machinelist) {
        this.customerId = customerId;
        this.addressId = addressId;
        this.name = name;
        this.name2 = name2;
        this.street = street;
        this.country = country;
        this.zipcode = zipcode;
        this.city = city;
        this.telephone = telephone;
        this.machinelist = machinelist;
    }
    ServiceModel.prototype.deserialize = function (input) {
        this.customerId = input.customerId;
        this.addressId = input.addressId;
        this.name = input.name,
            this.name2 = input.name2,
            this.street = input.street,
            this.country = input.country,
            this.zipcode = input.zipcode,
            this.city = input.city,
            this.telephone = input.telephone,
            this.machinelist = input.machinelist;
        return this;
    };
    ServiceModel.prototype.serialize = function () {
        return JSON.stringify(this);
    };
    return ServiceModel;
}());
exports.ServiceModel = ServiceModel;
//# sourceMappingURL=service.model.js.map