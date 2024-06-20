import { NewDossierDialogComponent } from './../new-dossier-dialog/new-dossier-dialog.component';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { DossiersModel } from 'src/app/@common/models/dossiers.model';
import { SocieteModel } from 'src/app/@common/models/societes.model';
import { DossierService } from 'src/app/@common/services/dossier.service';
import { SocieteService } from 'src/app/@common/services/societe.service';
import { DeposerDialogComponent } from '../deposer-dialog/deposer-dialog.component';
import { DeposerService } from '../deposer-dialog/deposer.service';

@Component({
  selector: 'app-societe-repertoire',
  // standalone: true,
  // imports: [],
  templateUrl: './societe-repertoire.component.html',
  styleUrl: './societe-repertoire.component.scss',
})
export class SocieteRepertoireComponent {
  @Input() item: SocieteModel;
  repertoireList: RepertoireListModel[] = []; // lal liste des dossiers qui séra en haut
  actualRepertoire: RepertoireListModel = new RepertoireListModel();
  rows = [];
  temp = [];
  searchZone = '';

  @ViewChild('widgetsContent', { read: ElementRef })
  public widgetsContent: ElementRef<any>;
  scroolActive = false;
  loading = true;
  ColumnMode = ColumnMode;
  nbligne: number = 20;
  constructor(
    private service: DossierService,
    private dialog: MatDialog,
    private translate: TranslateService,
    private deposerService: DeposerService
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // On vas Récupérer les dossiers de niveau 1 de la société
    const firstLink = '/dossiers';
    const firstRepertoire = new RepertoireListModel();
    (firstRepertoire.libelle = 'Dossiers'),
      (firstRepertoire.lienDos = firstLink);
    firstRepertoire.lienFiles = firstLink;
    firstRepertoire.public = false;
    this.actualRepertoire = firstRepertoire;
    this.repertoireList.push(firstRepertoire);

    this.getData();
  }
  getData() {
    this.loading = true;
    this.searchZone = '';
    this.rows = [];
    this.service
      .findDossierWithLink(
        this.item.id,
        this.actualRepertoire.lienDos,
        this.actualRepertoire.lienFiles
      )
      .then((value) => {
        if (value != null && value !== undefined) {
          // boucle pour remplir la table row
          // list des dossiers
          const l1 = value.dossiers.map((dos) => {
            const repElement = new RepertoireElementModel();
            repElement.type = 'd';
            repElement.public = dos.public;
            repElement.libelle = dos.nomfr;
            repElement.code = dos.code;
            repElement.createur = dos.createur;
            return repElement as RepertoireElementModel;
          });
          // Liste des fichiers
          const l2 = value.fichiers.map((data) => {
            const repElement = new RepertoireElementModel();
            repElement.type = 'f';
            // repElement.public = dos.public;
            repElement.libelle = data.nom;
            // repElement.code = dos.code;
            repElement.dateCreation = data.dateUpload;
            repElement.extension = data.typeFichier;
            repElement.lien = data.lien;
            repElement.taille = data.taille;
            repElement.createur = data.createur;
            return repElement as RepertoireElementModel;
          });
          this.temp = [...l1, ...l2];
          this.rows = [...this.temp];
        }
        this.loading = false;
        this.checkScrool();
      });
  }

  deposer() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      repertoire: this.actualRepertoire,
      dossierId: this.item.id,
    };

    dialogConfig.width = '700px';
    const dialogRef = this.dialog.open(DeposerDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deposerService.initService();
        this.getData();
      }
    });
  }

  noveauDossier() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      repertoire: this.actualRepertoire,
      dossierId: this.item.id,
    };

    dialogConfig.width = '400px';
    const dialogRef = this.dialog.open(NewDossierDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deposerService.initService();
        this.getData();
      }
    });
  }

  edit(row: RepertoireElementModel) {
    if (row.type == 'f') {
      // On doit ouvrir un fichier
      // console.log('ouvrir un fichier');
    } else {
      // console.log('ouvrir un dossier');
      //  On crée un repertoire model listqu'on vas ajouter à notre liste et attribuer à notre current repertoire
      this.loading = true;
      const rep = new RepertoireListModel();
      rep.libelle = row.libelle;
      rep.lienDos = `${this.actualRepertoire.lienDos}/${row.code}/sousDossiers`;
      rep.lienFiles = `${this.actualRepertoire.lienDos}/${row.code}/fichiers`;
      rep.public = row.public;
      this.repertoireList.push(rep);
      this.actualRepertoire = rep;
      this.getData();
      // On doit ouvrir un dossier
    }
  }

  gotoRep(index: number) {
    this.actualRepertoire = this.repertoireList[index];
    this.repertoireList.splice(index + 1);
    this.getData();
  }

  ngAfterViewInit() {
    // console.log(this.widgetsContent.nativeElement.scroll);
    // console.log(this.widgetsContent.nativeElement.scrollLeft);
    // console.log(this.widgetsContent.nativeElement.scrollRight);

    // console.log(this.widgetsContent.nativeElement.scrollWidth);
    // console.log(this.widgetsContent.nativeElement.clientWidth);
    this.checkScrool();
  }
  checkScrool() {
    if (
      this.widgetsContent.nativeElement.scrollWidth >
      this.widgetsContent.nativeElement.clientWidth
    ) {
      // console.log('La div a une barre de défilement horizontale.');
      this.scroolActive = true;
      this.scrollToEnd();
    } else {
      this.scroolActive = false;
      // console.log("La div n'a pas de barre de défilement horizontale.");
    }
  }
  onClickDossier(row) {}
  onClickFichier(row) {}
  public scrollToEnd(): void {
    const element = this.widgetsContent.nativeElement;
    element.scrollTo({
      left: element.scrollWidth,
      behavior: 'smooth',
    });
  }

  public scrollRight(): void {
    this.widgetsContent.nativeElement.scrollTo({
      left: this.widgetsContent.nativeElement.scrollLeft + 150,
      behavior: 'smooth',
    });
  }

  public scrollLeft(): void {
    this.widgetsContent.nativeElement.scrollTo({
      left: this.widgetsContent.nativeElement.scrollLeft - 150,
      behavior: 'smooth',
    });
  }

  filter(event) {
    this.rows = [];
    this.loading = true;
    const val = event.target.value.toLowerCase();

    const tp = this.temp.filter(function (d) {
      return d.libelle.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = tp;
    this.loading = false;
  }
}

export class RepertoireListModel {
  libelle: string;
  lienDos: string;
  lienFiles: string;
  public: boolean; // on applique le button deposer si c'est false ( oui si c'est false la compta peut deposer et non le client et si c'est oui, le client peut deposer et non la compta)
}
export class RepertoireElementModel {
  libelle: string;
  type: string; // Fichier ou dossier
  dateCreation: string; //On vera après
  extension: string;
  creePar: string;
  public: boolean;
  code: string;
  lien: string;
  taille: string;
  createur: string;
}
