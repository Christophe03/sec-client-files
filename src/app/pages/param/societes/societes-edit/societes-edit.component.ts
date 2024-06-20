import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { SocieteModel } from 'src/app/@common/models/societes.model';
import { SocieteResolver } from 'src/app/@common/resolvers/societe.resolver';
import { SocieteService } from 'src/app/@common/services/societe.service';
import { emailValidator } from 'src/app/theme/utils/app-validators';

@Component({
  selector: 'app-societes-edit',
  // standalone: true,
  // imports: [],
  templateUrl: './societes-edit.component.html',
  styleUrl: './societes-edit.component.scss',
})
export class SocietesEditComponent {
  item: SocieteModel = new SocieteModel();
  form: FormGroup;
  constructor(
    private resolver: SocieteResolver,
    private service: SocieteService,
    protected translate: TranslateService,
    private dialog: MatDialog,
    protected fb: FormBuilder
  ) {}

  ngOnInit() {
    this.resolver.data.subscribe((data) => {
      this.item = data;
      // console.log(this.item);
      this.buildForm();
    });
    this.buildForm();
  }

  protected buildForm(): void {
    this.form = this.fb.group({
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

  // ngOnDestroy() {
  //   console.log('DESTROY CALLED');
  //   this.resolver.data.unsubscribe();
  // }
}
