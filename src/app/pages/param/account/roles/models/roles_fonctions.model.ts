import { Fonctions } from '../../users/models/fonctions.model';

export class RolesFonctions {
  id: number;
  roleId: number;
  code: string;
  ordre: number;
  fonction: Fonctions;
}
