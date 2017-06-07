// External imports
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';
import { ClipboardService } from 'ng2-clipboard';
import { RouterModule } from '@angular/router';
import { BsDropdownModule, CollapseModule, TypeaheadModule } from 'ng2-bootstrap';
import { ToasterModule, ToasterService } from 'angular2-toaster';

// Internal imports
import { HeaderComponent } from '../common/header/header.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        MaterialModule,//.forRoot();
        ToasterModule,
        BsDropdownModule.forRoot(),
        TypeaheadModule.forRoot(),
        CollapseModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        HeaderComponent
    ],
    providers: [
        ClipboardService,
        ToasterService
    ],
    exports: [
        HeaderComponent,
        FormsModule,
        CommonModule,
        MaterialModule,
        ToasterModule,
        BsDropdownModule,
        TypeaheadModule,
        ReactiveFormsModule
    ],
    entryComponents: [
    ]
})

export class SharedModule { }
