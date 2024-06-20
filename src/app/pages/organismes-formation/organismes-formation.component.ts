import { Component, ViewChild } from '@angular/core';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { FiltreWrapper } from 'src/app/@common/wrappers/filtre-wrapper';

@Component({
  selector: 'app-organismes-formation',
  // standalone: true,
  // imports: [],
  templateUrl: './organismes-formation.component.html',
  styleUrl: './organismes-formation.component.scss',
})
export class OrganismesFormationComponent {
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
    this.getFormation();
  }

  getFormation(): void {
    // Simuler une récupération asynchrone des données
    setTimeout(() => {
      const data = {
        organismes_de_formation: [
          {
            nom: 'AeroFormation Paris',
            type_formation: 'Pilote Commercial',
            date_d_agrément: '15/06/2023',
            statut: 'Actif',
          },
          {
            nom: 'SkyTech Training Academy',
            type_formation: "Maintenance d'Aéronefs",
            date_d_agrément: '20/06/2023',
            statut: 'Actif',
          },
          {
            nom: 'Global Flight School',
            type_formation: 'Contrôle Aérien',
            date_d_agrément: '25/06/2023',
            statut: 'Suspendu',
          },
          {
            nom: 'Wings Aviation Institute',
            type_formation: 'Formation Initiale Pilote',
            date_d_agrément: '01/07/2023',
            statut: 'Actif',
          },
        ],
      };

      this.rows = [
        ...data.organismes_de_formation,
        // Notez que les autres données comme les licences ne sont pas incluses ici car elles ne font pas partie de ce jeu de données simulé.
      ];

      this.temp = [...this.rows];
      this.loading = false;
    }, 1000); // Simuler un délai d'une seconde (1000 ms)
  }
}
