import { Modules } from '../../users/models/modules.model';

export class RolesModules {
  id: number;
  roleId: number;
  code: string;
  ordre: number;
  module: Modules;
  actions: string;
}
