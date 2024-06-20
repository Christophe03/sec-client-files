import { Component, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { HistoComponent } from './histo/histo.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  @ViewChild('utilisateurs') utilisateurs: UsersComponent;
  @ViewChild('roles') roles: RolesComponent;
  @ViewChild('piste') piste: HistoComponent;
  index: number = 0;
  onTabChange(event: MatTabChangeEvent) {
    this.index = event.index;
    if (event.index === 0) {
      if (this.utilisateurs) this.utilisateurs.search();
    } else if (event.index === 1) {
      //if (this.roles) this.roles.search();
    } else if (event.index === 1) {
      //if (this.piste) this.piste.search();
    }
  }
}
