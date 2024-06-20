import { Component } from '@angular/core';
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { DossiersModel } from 'src/app/@common/models/dossiers.model';
import { SocieteModel } from 'src/app/@common/models/societes.model';
import { LoginService } from 'src/app/@common/services/login.service';
import { TacheService } from 'src/app/@common/services/tache.service';

@Component({
  selector: 'app-taches-list',
  // standalone: true,
  // imports: [],
  templateUrl: './taches-list.component.html',
  styleUrl: './taches-list.component.scss',
})
export class TachesListComponent {
  SelectionType = SelectionType;
  selected = [];
  ColumnMode = ColumnMode;
  nbligne: number = 20;
  loadingSociete = false;
  loadingfichier = false;
  societeList = [];
  selectedSociete = null;
  fichierListe = [];

  constructor(
    private tacheService: TacheService,
    private loginService: LoginService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loginService.account.subscribe((data) => {
      this.loadSociete();
    });
  }

  loadSociete() {
    this.loadingSociete = true;
    this.tacheService.loadSocieteWithFileToTraie().then((data) => {
      this.societeList = data /*as SocieteModel[]*/;
      if (this.societeList.length > 0) {
        this.selected = [];
        this.selected.push(this.societeList[0]);
        this.selectedSociete = this.societeList[0];
        this.loadSocieteFichierNonTraite();
      }
      this.loadingSociete = false;
    });
  }
  loadSocieteFichierNonTraite() {
    this.loadingfichier = true;
    this.fichierListe = [];
    this.tacheService
      .loadFichierNonTraiteParSociete(
        this.tacheService.getZoneDepotLink(this.selectedSociete)
      )
      .then((data) => {
        console.log(data);
        this.fichierListe = data /*as SocieteModel[]*/;
        this.loadingfichier = false;
      });
  }

  onSelect({ selected }) {
    console.log('Select Event', selected[0]);
    this.selectedSociete = selected[0] as SocieteModel;
    this.loadSocieteFichierNonTraite();
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }
}
