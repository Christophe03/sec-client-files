import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { SocieteService } from 'src/app/@common/services/societe.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/@common/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { SocietesAddComponent } from '../societes-add/societes-add.component';

@Component({
  selector: 'app-societes-list',
  // standalone: true,
  // imports: [],
  templateUrl: './societes-list.component.html',
  styleUrl: './societes-list.component.scss',
})
export class SocietesListComponent {
  ColumnMode = ColumnMode;
  rows = [];
  nbligne: number = 20;
  loading = true;
  constructor(
    private service: SocieteService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private router: Router
  ) {}
  ngOnInit() {
    this.getData();
  }
  getData() {
    this.loading = true;
    this.service.findAll().then((value) => {
      console.log(value);
      this.rows = [...value];
      this.loading = false;
    });
  }
  add() {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;

    (dialogConfig.width = '700px'), (dialogConfig.data = {});
    const dialogRef = this.dialog.open(SocietesAddComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.spinner.show();
        console.log(result);
        this.service.add(result.item, result.archi).then((val) => {
          // On affichera le message pour notifier de l'ajout avec succès
          this.spinner.hide();
          this.notificationService.open(
            'succes',
            this.translate.instant('Société ajoutée avec succès.'),
            ''
          );
          // this.getData();
          this.router.navigateByUrl('societes'.concat('/' + val));
        });
      }
    });
  }
  edit(row) {
    this.router.navigateByUrl('parametres/societes'.concat('/' + row.id));
  }
}
