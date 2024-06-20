import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import {
  ColumnMode,
  DatatableComponent,
  SelectionType,
} from '@swimlane/ngx-datatable';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConstanteService } from 'src/app/@common/services/constante.service';
import { LocalStorageService } from 'src/app/@common/services/local-storage.service';
import { NotificationService } from 'src/app/@common/services/notification.service';
import { FiltreWrapper } from 'src/app/@common/wrappers/filtre-wrapper';
import { ConfirmDialogComponent } from 'src/app/theme/components/confirm-dialog/confirm-dialog.component';
import { RolesAddComponent } from './components/roles-add/roles-add.component';
import { Roles } from './models/roles.model';
import { RolesService } from './roles.service';

@Component({
  selector: 'app-roles',

  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
})
export class RolesComponent {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  rows = [];
  temp = [];
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  nbligne: number = 10;
  fw = new FiltreWrapper();
  action: string = 'list';
  item: Roles;
  constructor(
    protected translate: TranslateService,
    private spinner: NgxSpinnerService,
    protected localStorageService: LocalStorageService,
    private notification: NotificationService,
    private dialog: MatDialog,
    private service: RolesService
  ) {}

  ngOnInit(): void {
    this.search();
  }

  filter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.nom.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }
  search() {
    this.temp = null;
    this.spinner.show();
    this.service.search(this.fw).subscribe((data) => {
      this.temp = ConstanteService.getDatas(data);
      this.temp = [...this.temp];
      this.rows = this.temp;
      this.spinner.hide();
      this.action = 'list';
    });
  }
  add() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '700px';
    dialogConfig.height = '200px';
    dialogConfig.data = {
      // projet: this.projet,
    };
    const dialogRef = this.dialog.open(RolesAddComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.spinner.show();
        this.service.save(result).subscribe(
          (data) => {
            this.spinner.hide();
            this.notification.openSnackBar(
              'succes',
              'msg.save.item.succes',
              { f: this.translate.instant('role') },
              ''
            );
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
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = false;
    // dialogConfig.autoFocus = false;
    // dialogConfig.width = "700px";
    // dialogConfig.height = "200px";
    // dialogConfig.data = {
    //   item: row,
    // };
    // const dialogRef = this.dialog.open(RolesEditComponent, dialogConfig);
    // dialogRef.afterClosed().subscribe((result) => {
    //   if (result) {
    //     this.spinner.show();
    //     this.service.update(result.id, result).subscribe(
    //       (data) => {
    //         this.spinner.hide();
    //         this.notification.openSnackBar(
    //           "succes",
    //           "msg.update.item.succes",
    //           { f: this.translate.instant("role") },
    //           ""
    //         );
    //         this.search()
    //       },
    //       (error) => {
    //         this.showError(error);
    //       }
    //     );
    //   }
    // });
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
        this.service.delete(this.item.id).subscribe((data) => {
          this.spinner.hide();
          this.notification.openSnackBar(
            'succes',
            'msg.delete.item.succes',
            { f: this.translate.instant('role') },
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
