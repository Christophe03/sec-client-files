import { SousDossiersModel } from './sousDossiers.model';

export class DossiersModel {
  code: string;
  nomen: string;
  nomfr: string;
  public: boolean;
  createur: string;
  sousDossiers: SousDossiersModel[];
}
