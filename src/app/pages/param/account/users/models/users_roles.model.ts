import { Roles } from '../../roles/models/roles.model';

export class UsersRoles {
  id: number;

  userId: number;

  roleId: number;
  role: Roles;
}
