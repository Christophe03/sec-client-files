import { Applications } from './applications.model';
import { Modules } from './modules.model';

export class Fonctions {
  code: string;

  key: string;

  nom: string;

  description: string;

  ordre: number;

  url: string;

  icon: string;

  position: string;

  nature: string;

  actions?: string;

  statut: number;

  moduleCode: string;
  module: Modules;

  applicationCode: string;

  application: Applications;
}
