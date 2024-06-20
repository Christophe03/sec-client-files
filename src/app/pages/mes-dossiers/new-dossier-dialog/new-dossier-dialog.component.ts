import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { DossierService } from 'src/app/@common/services/dossier.service';
import { NotificationService } from 'src/app/@common/services/notification.service';

@Component({
  selector: 'app-new-dossier-dialog',
  // standalone: true,
  // imports: [],
  templateUrl: './new-dossier-dialog.component.html',
  styleUrl: './new-dossier-dialog.component.scss',
})
export class NewDossierDialogComponent {
  repertoire: any; // c'est n réalité un type RepertoireListModel
  dossierId: string;
  isLoading = false;
  portee: boolean;
  form = new FormGroup({
    nomfr: this.fb.control('', [Validators.required]),
  });
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    protected translate: TranslateService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<NewDossierDialogComponent>,
    private dossierService: DossierService,
    private notificationService: NotificationService
  ) {
    this.repertoire = data.repertoire;
    this.dossierId = data.dossierId;
    console.log(data);
  }

  save() {
    this.isLoading = true;
    const fg = this.form.value;

    this.dossierService
      .addNewDossier(
        this.repertoire.lienDos,
        this.dossierId,
        this.repertoire.public != null ? this.repertoire.public : false, // Si le repertoire aura la même porter que son repertoire parent et si c'est vide ( on est à la source ), ca sera false
        fg.nomfr,
        fg.nomfr
      )
      .then((res) => {
        if (res) {
          this.isLoading = false;
          this.notificationService.open(
            'succes',
            'Opération effectuée avec succès.',
            ''
          );
          this.dialogRef.close(true);
        } else {
          this.isLoading = false;
          this.errorMessage =
            "Une erreur est intervenu lors de l'éxécution de l'opération";
          this.notificationService.open('error', this.errorMessage, '');
          // this.dialogRef.close(false);
        }
      })
      .catch((err) => {
        this.isLoading = false;
        this.errorMessage =
          "Une erreur est intervenu lors de l'éxécution de l'opération";
        this.notificationService.open('error', this.errorMessage, '');
      })
      .finally(() => {
        this.isLoading = false;
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
