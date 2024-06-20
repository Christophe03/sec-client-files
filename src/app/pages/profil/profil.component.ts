import { Component, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ProfilPrefsComponent } from './profil-prefs/profil-prefs.component';
import { ProfilSecuComponent } from './profil-secu/profil-secu.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss',
})
export class ProfilComponent {
  @ViewChild('prefs') roles: ProfilPrefsComponent;
  @ViewChild('secu') piste: ProfilSecuComponent;
  index: number = 0;
  onTabChange(event: MatTabChangeEvent) {
    this.index = event.index;
    if (event.index === 0) {
      //if (this.utilisateurs) this.utilisateurs.search();
    } else if (event.index === 1) {
      //if (this.roles) this.roles.search();
    }
  }
}
