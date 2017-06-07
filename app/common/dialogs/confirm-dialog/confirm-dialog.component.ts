import { Component} from '@angular/core';
import { MdDialogRef } from '@angular/material';
// confirmation Dialog
@Component({
    moduleId: module.id.replace('/compiledSrc', ''),
    selector: 'confirm-dialog',
    templateUrl: 'confirm-dialog.component.html',
    styleUrls: ['confirm-dialog.component.css']
})

export class ConfirmDialog {
    public title: string;
    public message: string;
    constructor(public dialogRef: MdDialogRef<ConfirmDialog>) {
        
    }
}
