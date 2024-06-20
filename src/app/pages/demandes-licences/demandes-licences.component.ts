// src/app/components/demandes-licences/demandes-licences.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { FiltreWrapper } from 'src/app/@common/wrappers/filtre-wrapper';

@Component({
  selector: 'app-demandes-licences',
  templateUrl: './demandes-licences.component.html',
  styleUrls: ['./demandes-licences.component.scss'],
})
export class DemandesLicencesComponent implements OnInit {
  @ViewChild(DatatableComponent) table: DatatableComponent;
  imageUrl: string;
  selectedFile: File;
  rows = [];
  temp = [];
  ColumnMode = ColumnMode;
  nbligne: number = 20;
  fw = new FiltreWrapper();
  loading = true;

  ngOnInit(): void {
    this.getDemandesDeLicences();
  }

  getDemandesDeLicences(): void {
    // Simuler une récupération asynchrone des données
    setTimeout(() => {
      const data = {
        periode: 'Janvier 2023 - Juin 2023',
        demandes: [
          {
            numéro_demande: '2023-001',
            type_licence: 'Pilote Commercial',
            statut: 'En Attente de Révision',
          },
          {
            numéro_demande: '2023-002',
            type_licence: 'Contrôleur Aérien',
            statut: 'En Cours de Traitement',
          },
          {
            numéro_demande: '2023-003',
            type_licence: "Mécanicien d'Aéronef",
            statut: 'Complète',
          },
          {
            numéro_demande: '2023-004',
            type_licence: 'Instructeur de Vol',
            statut: 'Rejetée',
          },
        ],
      };

      this.rows = data.demandes;
      this.temp = [...this.rows];
      this.loading = false;
    }, 1000);
  }
}
