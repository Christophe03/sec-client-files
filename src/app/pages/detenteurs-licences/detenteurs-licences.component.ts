import { Component, ViewChild } from '@angular/core';
import { DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { FiltreWrapper } from 'src/app/@common/wrappers/filtre-wrapper';

@Component({
  selector: 'app-detenteurs-licences',
  // standalone: true,
  // imports: [],
  templateUrl: './detenteurs-licences.component.html',
  styleUrl: './detenteurs-licences.component.scss',
})
export class DetenteursLicencesComponent {
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
    this.getDetenteur();
  }

  getDetenteur(): void {
    // Simuler une récupération asynchrone des données
    setTimeout(() => {
      const data = {
        detenteur: {
          licences_actives: [
            {
              nom: 'John Doe',
              type_licence: 'Pilote Commercial',
              date_de_délivrance: '15/06/2023',
              date_d_expiration: '15/06/2025',
            },
            {
              nom: 'Jane Smith',
              type_licence: 'Instructeur de Vol',
              date_de_délivrance: '20/06/2023',
              date_d_expiration: '20/06/2024',
            },
          ],
          licences_expirées: [
            {
              nom: 'Michael Brown',
              type_licence: "Mécanicien d'Aéronef",
              date_de_délivrance: '10/01/2022',
              date_d_expiration: '10/01/2023',
            },
          ],
          licences_suspendues: [
            {
              nom: 'Emily White',
              type_licence: 'Pilote Privé',
              date_de_délivrance: '01/02/2023',
              date_d_expiration: '01/02/2024',
            },
          ],
          licences_révoquées: [
            {
              nom: 'Robert Green',
              type_licence: 'Contrôleur Aérien',
              date_de_délivrance: '05/03/2023',
              date_d_expiration: '05/03/2024',
            },
          ],
        },
      };

      this.rows = [
        ...data.detenteur.licences_actives,
        ...data.detenteur.licences_expirées,
        ...data.detenteur.licences_suspendues,
        ...data.detenteur.licences_révoquées,
      ];

      this.temp = [...this.rows];
      this.loading = false;
    }, 1000); // Simuler un délai d'une seconde (1000 ms)
  }
}
