import { Users } from './users';

import { Menu } from 'src/app/theme/components/menu/menu.model';

export class LoginResponse {
  status: boolean;
  message: string;
  access_token: string;
  user: Users;
  menuItems: Menu[];
  sousMenuItems: Menu[];
  constructor() {}
}
