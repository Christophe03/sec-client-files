import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
  modalTitle: string;
  message: string;
  no: string;
  yes: string;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected translate: TranslateService
  ) {
    this.message = data.message;
    this.modalTitle = this.translate.instant('confirmation...');
    this.yes = this.translate.instant('oui');
    this.no = this.translate.instant('non');
  }

  ngOnInit() {}
}
