// External imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes  } from '@angular/router';
//import { HomeComponent } from './home/home.component'
// Internal imports
import { AuthGaurdService } from './authentication/auth-gaurd.service';
//DashBoard
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/home/home.component';
import { UserComponent } from './dashboard/user/user.component';
import { IconsComponent } from './dashboard/icons/icons.component';
import { TableComponent } from './dashboard/table/table.component';
import { NotificationsComponent } from './dashboard/notifications/notifications.component';
import { TypographyComponent } from './dashboard/typography/typography.component';
import { MapsComponent } from './dashboard/maps/maps.component';
// Define Routes
const AppRoutes: Routes  = [
   { path: 'home', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGaurdService], data: { 'access': { requiredAuthentication: true} }},
   { path: '', redirectTo: '/home', pathMatch: 'full' },
	
{ path: 'dashboard', component: HomeComponent },
    { path: 'user', component: UserComponent },
    { path: 'table', component: TableComponent },
    { path: 'icons', component: IconsComponent },
    { path: 'notifications', component: NotificationsComponent },
    { path: 'typography', component: TypographyComponent },
    { path: 'maps', component: MapsComponent },
   
    { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
    imports: [
        RouterModule.forRoot(AppRoutes, { useHash: true })
    ],
    providers: [
        AuthGaurdService
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
