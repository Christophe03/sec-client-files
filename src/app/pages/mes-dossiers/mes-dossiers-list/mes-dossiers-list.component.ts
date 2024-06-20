import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { SocieteService } from 'src/app/@common/services/societe.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NotificationService } from 'src/app/@common/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/@common/services/login.service';
import { Users } from 'src/app/@common/models/users';

@Component({
  selector: 'app-mes-dossiers-list',
  // standalone: true,
  // imports: [],
  templateUrl: './mes-dossiers-list.component.html',
  styleUrl: './mes-dossiers-list.component.scss',
})
export class MesDossiersListComponent {
  ColumnMode = ColumnMode;
  rows = [];
  nbligne: number = 20;
  loading = true;
  user: Users;
  constructor(
    private service: SocieteService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private router: Router,
    private loginService: LoginService
  ) {}
  ngOnInit() {
    this.loginService.account.subscribe((data) => {
      this.user = data;
      console.log(this.user);
      this.getData(this.user.societes);
    });
  }
  getData(ids: string[]) {
    this.loading = true;
    this.service.findByUserSocietes(ids).then((value) => {
      console.log(value);
      this.rows = [...value];
      this.loading = false;
    });
  }
  edit(row) {
    this.router.navigateByUrl('mes-dossiers'.concat('/' + row.id));
  }
}
