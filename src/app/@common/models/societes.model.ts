import { DossiersModel } from './dossiers.model';

export class SocieteModel {
  id: string;
  adresse: string;
  bp: string; //boite postal
  email: string;
  nif: string; //numéro d'identification fiscal
  raisonSocial: string;
  rccm: string; // registre de commerce
  responsable: string;
  sigle: string;
  telephone: string;
  dossier: DossiersModel[];
  non_traite: number;
}
