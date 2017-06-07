import { Component} from '@angular/core';
import { MdDialogRef } from '@angular/material';
// confirmation Dialog
@Component({
    moduleId: module.id.replace('/compiledSrc', ''),
    selector: 'notify-dialog',
    templateUrl: 'notify-dialog.component.html',
    styleUrls: ['notify-dialog.component.css']
})

export class NotifyDialog {
    public title: string;
    public message: string;
    constructor(public dialogRef: MdDialogRef<NotifyDialog>) {}
}
