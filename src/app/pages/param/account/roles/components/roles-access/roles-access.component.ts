import { Component, HostListener, Input, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';

import { CommonService } from 'src/app/@common/services/common.service';
import { ConstanteService } from 'src/app/@common/services/constante.service';
import { NotificationService } from 'src/app/@common/services/notification.service';
import { FiltreWrapper } from 'src/app/@common/wrappers/filtre-wrapper';
import { Modules } from '../../../users/models/modules.model';
import { Roles } from '../../models/roles.model';
import { RolesFonctions } from '../../models/roles_fonctions.model';
import { RolesModules } from '../../models/roles_modules.model';
import { RolesService } from '../../roles.service';
import { RolesAccessFonctionsComponent } from './roles-access-fonctions/roles-access-fonctions.component';
import { RolesAccessModulesComponent } from './roles-access-modules/roles-access-modules.component';

@Component({
  selector: 'app-roles-access',
  templateUrl: './roles-access.component.html',
  styleUrls: ['./roles-access.component.scss'],
})
export class RolesAccessComponent {
  @ViewChild('sidenav') sidenav: any;
  @Input() role: Roles;
  public sidenavOpen: boolean = true;
  modules: RolesModules[] = [];
  module: RolesModules;
  fonctions: RolesFonctions[] = [];
  fonction: RolesFonctions;
  fw = new FiltreWrapper();

  constructor(
    protected translate: TranslateService,
    private spinner: NgxSpinnerService,
    protected commonService: CommonService,
    protected rolesService: RolesService,
    private dialog: MatDialog,
    private notification: NotificationService
  ) {}
  ngOnInit(): void {
    this.loadModule();
  }

  loadModule() {
    this.fw.roleId = this.role.id;
    this.rolesService.searchModule(this.fw).subscribe((data) => {
      this.modules = ConstanteService.getDatas(data);
    });
  }
  @HostListener('window:resize')
  public onWindowResize(): void {
    window.innerWidth <= 992
      ? (this.sidenavOpen = false)
      : (this.sidenavOpen = true);
  }
  show(m) {
    this.module = m;
    this.fw.roleId = this.role.id;
    this.fw.filtre = m.code;
    this.rolesService.searchFonction(this.fw).subscribe((data) => {
      const l = ConstanteService.getDatas(data);
      this.fonctions = l.filter((f) => f.fonction.nature === 'M');
    });
  }

  addModule() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '500px';
    dialogConfig.height = '350px';
    dialogConfig.data = {
      role: this.role.id,
    };
    const dialogRef = this.dialog.open(
      RolesAccessModulesComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const ms: Modules[] = result;
        let ids = '';
        ms.forEach((c) => {
          ids += c.code + ',';
        });
        this.spinner.show();
        const me: RolesModules = new RolesModules();
        me.roleId = this.role.id;
        me.code = ids;
        this.rolesService.saveModule(me).subscribe(
          (data) => {
            this.spinner.hide();
            this.notification.openSnackBar(
              'succes',
              'msg.save.item.succes',
              { f: this.translate.instant('module') },
              ''
            );
            this.loadModule();
          },
          (error) => {
            this.showError(error);
          }
        );
      }
    });
  }
  delModule(m) {
    this.module = m;
    this.spinner.show();
    this.rolesService.deleteModule(m.id).subscribe((data) => {
      this.spinner.hide();
      this.notification.openSnackBar(
        'succes',
        'msg.delete.item.succes',
        { f: this.translate.instant('module') },
        ''
      );
      this.loadModule();
      this.spinner.hide();
      (error) => {
        this.showError(error);
      };
    });
  }
  addFonction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    dialogConfig.width = '600px';
    dialogConfig.height = '450px';
    dialogConfig.data = {
      role: this.role.id,
      module: this.module.code,
    };
    const dialogRef = this.dialog.open(
      RolesAccessFonctionsComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const fs: Modules[] = result;
        let ids = '';
        fs.forEach((c) => {
          ids += c.code + ',';
        });
        this.spinner.show();
        const fe: RolesFonctions = new RolesFonctions();
        fe.roleId = this.role.id;
        fe.code = ids;

        this.rolesService.saveFonction(fe).subscribe(
          (data) => {
            this.spinner.hide();
            this.notification.openSnackBar(
              'succes',
              'msg.save.item.succes',
              { f: this.translate.instant('fonctionnalite') },
              ''
            );
            this.show(this.module);
          },
          (error) => {
            this.showError(error);
          }
        );
      }
    });
  }
  delFonction(f) {
    this.fonction = f;
    this.spinner.show();
    this.rolesService.deleteFonction(f.id).subscribe((data) => {
      this.spinner.hide();
      this.notification.openSnackBar(
        'succes',
        'msg.delete.item.succes',
        { f: this.translate.instant('fonctionnalite') },
        ''
      );
      this.show(this.module);
      this.spinner.hide();
      (error) => {
        this.showError(error);
      };
    });
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
