import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { SocieteModel } from 'src/app/@common/models/societes.model';
import { SocieteResolver } from 'src/app/@common/resolvers/societe.resolver';
import { ConfirmDialogComponent } from 'src/app/theme/components/confirm-dialog/confirm-dialog.component';
import { emailValidator } from 'src/app/theme/utils/app-validators';

@Component({
  selector: 'app-societes-add',
  // standalone: true,
  // imports: [],
  templateUrl: './societes-add.component.html',
  styleUrl: './societes-add.component.scss',
})
export class SocietesAddComponent {
  form: FormGroup;
  item: SocieteModel;
  archiList = [];
  selectArchi = '';
  constructor(
    protected translate: TranslateService,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<SocietesAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected fb: FormBuilder,
    private resolver: SocieteResolver
  ) {
    this.archiList = resolver.archiList != null ? resolver.archiList : [];
    if (this.archiList.length > 0) this.selectArchi = this.archiList[0];
  }

  ngOnInit() {
    this.item = new SocieteModel();
    this.buildForm();
  }

  protected buildForm(): void {
    this.form = this.fb.group({
      selectArchi: this.fb.control(this.selectArchi, [Validators.required]),
      sigle: this.fb.control(this.item.sigle, [Validators.required]),
      raisonSocial: this.fb.control(this.item.raisonSocial, [
        Validators.required,
      ]),
      rccm: this.fb.control(this.item.rccm, [Validators.required]),
      telephone: this.fb.control(this.item.telephone, [Validators.required]),
      nif: this.fb.control(this.item.nif, [Validators.required]),
      adresse: this.fb.control(this.item.adresse, [Validators.required]),
      bp: this.fb.control(this.item.bp, [Validators.required]),
      responsable: this.fb.control(this.item.responsable, [
        Validators.required,
      ]),
      email: this.fb.control(this.item.email, [
        Validators.required,
        emailValidator,
        // this.findDuplicateEmail(),
      ]),
    });
    this.subscribe();
  }

  private subscribe(): void {
    if (!this.form) {
      this.buildForm();
    }
    this.form
      .get('sigle')
      .valueChanges.subscribe((value) => (this.item.sigle = value));
    this.form
      .get('raisonSocial')
      .valueChanges.subscribe((value) => (this.item.raisonSocial = value));
    this.form
      .get('rccm')
      .valueChanges.subscribe((value) => (this.item.rccm = value));
    this.form
      .get('telephone')
      .valueChanges.subscribe((value) => (this.item.telephone = value));
    this.form
      .get('nif')
      .valueChanges.subscribe((value) => (this.item.nif = value));
    this.form
      .get('adresse')
      .valueChanges.subscribe((value) => (this.item.adresse = value));
    this.form
      .get('bp')
      .valueChanges.subscribe((value) => (this.item.bp = value));
    this.form
      .get('responsable')
      .valueChanges.subscribe((value) => (this.item.responsable = value));
    this.form
      .get('email')
      .valueChanges.subscribe((value) => (this.item.email = value));
  }

  save() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    (dialogConfig.width = '500px'),
      (dialogConfig.data = {
        message: this.translate.instant('Voulez vous ajouter cette société ?'),
      });
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dialogRef.close({ item: this.item, archi: this.selectArchi });
      }
    });
  }
  closeDialog() {
    this.dialogRef.close();
  }
  showError(error): void {
    // this.spinner.hide();
    // this.notificationService.openSnackBar(
    //   'error',
    //   'oups.erreur.survenue',
    //   { f: ConstanteService.getErrorMessage(error) },
    //   ''
    // );
  }
}
