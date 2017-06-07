"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
// Import External
require("hammerjs");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations"); // after angular4  animations package, which is no longer part of core.
// Import internal
var shared_module_1 = require("./common/shared.module");
var authentication_module_1 = require("./authentication/authentication.module");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var common_services_1 = require("./common/common.services");
var http_1 = require("@angular/http");
var http_factory_1 = require("./authentication/http.factory");
var confirm_dialog_component_1 = require("./common/dialogs/confirm-dialog/confirm-dialog.component");
var notify_dialog_component_1 = require("./common/dialogs/notify-dialog/notify-dialog.component");
var md2_1 = require("md2");
var core_2 = require("@ngx-translate/core");
var http_loader_1 = require("@ngx-translate/http-loader");
var core_3 = require("@ngx-translate/core");
var moment_module_1 = require("angular2-moment/moment.module");
var sidebar_module_1 = require("./sidebar/sidebar.module");
var footer_module_1 = require("./shared/footer/footer.module");
var navbar_module_1 = require("./shared/navbar/navbar.module");
var home_component_1 = require("./dashboard/home/home.component");
var user_component_1 = require("./dashboard/user/user.component");
var icons_component_1 = require("./dashboard/icons/icons.component");
var table_component_1 = require("./dashboard/table/table.component");
var notifications_component_1 = require("./dashboard/notifications/notifications.component");
var typography_component_1 = require("./dashboard/typography/typography.component");
var maps_component_1 = require("./dashboard/maps/maps.component");
// for passing cookies we have modifiy existing class
var CustomBrowserXhr = (function (_super) {
    __extends(CustomBrowserXhr, _super);
    function CustomBrowserXhr() {
        return _super.call(this) || this;
    }
    ;
    CustomBrowserXhr.prototype.build = function () {
        var xhr = _super.prototype.build.call(this);
        xhr.withCredentials = true;
        return (xhr);
    };
    return CustomBrowserXhr;
}(http_1.BrowserXhr));
CustomBrowserXhr = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], CustomBrowserXhr);
exports.CustomBrowserXhr = CustomBrowserXhr;
// AoT requires an exported function for factories
function HttpLoaderFactory(http) {
    return new http_loader_1.TranslateHttpLoader(http);
}
exports.HttpLoaderFactory = HttpLoaderFactory;
var AppModule = (function () {
    function AppModule(translate) {
    }
    AppModule.prototype.ngOnInit = function () {
        // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang('en');
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        this.translate.use('en');
    };
    ;
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            animations_1.BrowserAnimationsModule,
            shared_module_1.SharedModule,
            md2_1.Md2Module.forRoot(),
            authentication_module_1.AuthenticationModule,
            app_routing_1.AppRoutingModule,
            //		  DashboardModule,
            sidebar_module_1.SidebarModule,
            navbar_module_1.NavbarModule,
            footer_module_1.FooterModule,
            core_2.TranslateModule.forRoot({
                loader: {
                    provide: core_2.TranslateLoader,
                    useFactory: HttpLoaderFactory,
                    deps: [http_1.Http]
                }
            }),
            moment_module_1.MomentModule
        ],
        exports: [
            confirm_dialog_component_1.ConfirmDialog,
            notify_dialog_component_1.NotifyDialog,
        ],
        declarations: [
            app_component_1.AppComponent,
            confirm_dialog_component_1.ConfirmDialog,
            notify_dialog_component_1.NotifyDialog,
            home_component_1.HomeComponent,
            user_component_1.UserComponent,
            table_component_1.TableComponent,
            icons_component_1.IconsComponent,
            notifications_component_1.NotificationsComponent,
            typography_component_1.TypographyComponent,
            maps_component_1.MapsComponent
        ],
        providers: [
            common_services_1.DialogService,
            {
                provide: http_1.Http,
                useFactory: http_factory_1.httpFactory,
                deps: [http_1.XHRBackend, http_1.RequestOptions]
            },
            {
                provide: http_1.BrowserXhr,
                useClass: CustomBrowserXhr
            },
            common_services_1.MessageService,
            common_services_1.UserService,
            common_services_1.LocalStorageUtilityService
        ],
        entryComponents: [
            confirm_dialog_component_1.ConfirmDialog,
            notify_dialog_component_1.NotifyDialog
        ],
        bootstrap: [app_component_1.AppComponent]
    }),
    __metadata("design:paramtypes", [core_3.TranslateService])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map