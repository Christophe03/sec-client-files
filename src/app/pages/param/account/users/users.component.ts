import { Settings } from '@amcharts/amcharts5/.internal/core/util/Entity';
import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';
import { Users } from 'src/app/@common/models/users';
import { CommonService } from 'src/app/@common/services/common.service';
import { ConstanteService } from 'src/app/@common/services/constante.service';

import { LocalStorageService } from 'src/app/@common/services/local-storage.service';
import { NotificationService } from 'src/app/@common/services/notification.service';
import { UsersService } from 'src/app/@common/services/users.service';
import { FiltreWrapper } from 'src/app/@common/wrappers/filtre-wrapper';
import { ConfirmDialogComponent } from 'src/app/theme/components/confirm-dialog/confirm-dialog.component';
import { UsersAddComponent } from './components/users-add/users-add.component';

@Component({
  selector: 'app-user',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  public page: any;
  public settings: Settings;
  viewType = 'grid';
  rows = [];
  temp = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  nbligne: number = 10;
  fw = new FiltreWrapper();
  action: string = 'list';
  item: Users;

  constructor(
    private service: UsersService,
    protected translate: TranslateService,
    private spinner: NgxSpinnerService,
    protected localStorageService: LocalStorageService,
    private notification: NotificationService,
    private commonService: CommonService,
    private dialog: MatDialog,
    private router: Router
  ) {}
  ngOnInit(): void {
    // this.search();
  }
  toggleViewType(v) {
    this.viewType = v;
  }
  public onPageChanged(event) {
    this.page = event;
    //J'ai mis ca en commentaire sinon après la recherche on a tout qui sera recharger quand on va vouloir paginer
    //this.search();
    // if (this.settings.fixedHeader) {
    //   document.getElementById('main-content').scrollTop = 0;
    // } else {
    //   document.getElementsByClassName('mat-drawer-content')[0].scrollTop = 0;
    // }
  }

  filter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }
  search() {
    this.temp = null;
    this.service.search(this.fw).subscribe((data) => {
      this.temp = ConstanteService.getDatas(data);
      this.temp = [...this.temp];
      this.rows = this.temp;

      this.action = 'list';
    });
  }
  add() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '700px';
    dialogConfig.height = '220px';
    dialogConfig.data = {
      users: this.rows,
    };
    const dialogRef = this.dialog.open(UsersAddComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.spinner.show();
        this.service.save(result).subscribe(
          (data) => {
            const response = ConstanteService.getDatas(data);
            console.log(data);
            this.spinner.hide();
            if (response.status === 'succes') {
              this.notification.openSnackBar(
                'succes',
                response.message,
                { f: this.translate.instant('utilisateur') },
                ''
              );
            }
            if (response.status === 'error') {
              this.notification.openSnackBar(
                'error',
                response.message,
                { f: this.translate.instant('utilisateur') },
                ''
              );
            }
            this.search();
          },
          (error) => {
            this.showError(error);
          }
        );
      }
    });
  }
  edit(row) {
    this.action = 'edit';
    this.item = row;
  }
  del(row) {
    this.item = row;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    (dialogConfig.width = '500px'),
      (dialogConfig.data = {
        message: this.translate.instant('msg.delete.one'),
      });
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.spinner.show();
        this.service.delete(this.item).subscribe((data) => {
          this.spinner.hide();
          this.notification.openSnackBar(
            'succes',
            'msg.delete.item.succes',
            { f: this.translate.instant('utilisateurs') },
            ''
          );
          this.search();

          (error) => {
            this.showError(error);
          };
        });
      }
    });
  }
  reload() {}
  cancel(a: string) {
    this.search();
  }
  showError(error): void {
    this.spinner.hide();
    this.notification.openSnackBar(
      'error',
      'oups.erreur.survenue',
      { f: ConstanteService.getErrorMessage(error) },
      ''
    );
  }
}
