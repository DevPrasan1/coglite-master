
// Import External
import 'hammerjs';
import { NgModule, Injectable, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // after angular4  animations package, which is no longer part of core.

// Import internal
import { SharedModule } from './common/shared.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { MessageService, UserService, DialogService, LocalStorageUtilityService } from './common/common.services';
import { HttpModule, Http, XHRBackend, RequestOptions, BrowserXhr } from '@angular/http';
import { httpFactory } from './authentication/http.factory';
import { ConfirmDialog } from './common/dialogs/confirm-dialog/confirm-dialog.component';
import { NotifyDialog } from './common/dialogs/notify-dialog/notify-dialog.component';
import { Md2Module } from 'md2';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateService } from '@ngx-translate/core';
import { MomentModule } from 'angular2-moment/moment.module';


import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
//import { HomeComponent } from './home/home.component'
//import { DashboardModule } from './dashboard/dashboard.module';
//DashBoard
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { UserComponent } from './dashboard/user/user.component';
import { IconsComponent } from './dashboard/icons/icons.component';
import { TableComponent } from './dashboard/table/table.component';
import { NotificationsComponent } from './dashboard/notifications/notifications.component';
import { TypographyComponent } from './dashboard/typography/typography.component';
import { MapsComponent } from './dashboard/maps/maps.component';
// for passing cookies we have modifiy existing class
@Injectable()
export class CustomBrowserXhr extends BrowserXhr {
    constructor() { super(); };
    build(): any {
           const xhr = super.build();
           xhr.withCredentials = true;
           return <any>(xhr);
    }
 }

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    imports: [
              BrowserModule,
              BrowserAnimationsModule,
              SharedModule,
              Md2Module.forRoot(),
              AuthenticationModule,
              AppRoutingModule,
	//		  DashboardModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
              TranslateModule.forRoot({
                loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [Http]
               }
             }),
             MomentModule
           ],
     exports: [
             ConfirmDialog,
             NotifyDialog,
           ],
     declarations: [
             AppComponent,
             ConfirmDialog,
             NotifyDialog,
             HomeComponent,
    UserComponent,
    TableComponent,
    IconsComponent,
    NotificationsComponent,
    TypographyComponent,
    MapsComponent
          ],
    providers: [
            DialogService,
            {
              provide: Http,
              useFactory: httpFactory,
              deps: [XHRBackend, RequestOptions]
            },
            {
              provide: BrowserXhr,
              useClass: CustomBrowserXhr
            },
            MessageService,
            UserService,
            LocalStorageUtilityService
        ],
    entryComponents: [
            ConfirmDialog,
            NotifyDialog
       ],
    bootstrap: [AppComponent]
})
export class AppModule implements OnInit {
   private translate: any;
   constructor(translate: TranslateService) {}

   ngOnInit(): void {
		// this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang('en');

		// the lang to use, if the lang isn't available, it will use the current loader to get them
        this.translate.use('en');
   };
}
