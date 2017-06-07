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
var router_1 = require("@angular/router");
//import { HomeComponent } from './home/home.component'
// Internal imports
var auth_gaurd_service_1 = require("./authentication/auth-gaurd.service");
var home_component_1 = require("./dashboard/home/home.component");
var user_component_1 = require("./dashboard/user/user.component");
var icons_component_1 = require("./dashboard/icons/icons.component");
var table_component_1 = require("./dashboard/table/table.component");
var notifications_component_1 = require("./dashboard/notifications/notifications.component");
var typography_component_1 = require("./dashboard/typography/typography.component");
var maps_component_1 = require("./dashboard/maps/maps.component");
// Define Routes
var AppRoutes = [
    { path: 'home', component: home_component_1.HomeComponent, pathMatch: 'full', canActivate: [auth_gaurd_service_1.AuthGaurdService], data: { 'access': { requiredAuthentication: true } } },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'dashboard', component: home_component_1.HomeComponent },
    { path: 'user', component: user_component_1.UserComponent },
    { path: 'table', component: table_component_1.TableComponent },
    { path: 'icons', component: icons_component_1.IconsComponent },
    { path: 'notifications', component: notifications_component_1.NotificationsComponent },
    { path: 'typography', component: typography_component_1.TypographyComponent },
    { path: 'maps', component: maps_component_1.MapsComponent },
    { path: '**', redirectTo: '/login', pathMatch: 'full' },
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forRoot(AppRoutes, { useHash: true })
        ],
        providers: [
            auth_gaurd_service_1.AuthGaurdService
        ],
        exports: [
            router_1.RouterModule
        ]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app.routing.js.map