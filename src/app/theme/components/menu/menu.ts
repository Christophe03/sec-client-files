import { Menu } from './menu.model';

export const verticalMenuItems = [
  new Menu(1, '', 'Tableau de bord', '/', null, 'dashboard', null, false, 0),
  new Menu(
    2,
    '',
    'Dossiers du personnel',
    '/user-info',
    null,
    'computer',
    null,
    false,
    0
  ),
  new Menu(
    3,
    '',
    'Réferentiel RH',
    '/2',
    null,
    'card_membership',
    null,
    true,
    0
  ),
  new Menu(31, '', 'Pays', '/', null, 'card_membership', null, false, 3),
  new Menu(5, '', 'Paramètres', '/4', null, 'settings', null, true, 0),
  new Menu(8, '', 'Gestion des alertes', '/5', null, 'tab', null, false, 5),
  new Menu(
    51,
    '',
    'Roles & permission',
    '/6',
    null,
    'supervisor_account',
    null,
    false,
    5
  ),
  new Menu(7, '', 'Utilisateurs', '/7', null, 'home', null, false, 5),
  new Menu(
    9,
    '',
    'Structures / Departements',
    '/8',
    null,
    'dns',
    null,
    false,
    5
  ),
];

export const maillonAppMenu = [
  new Menu(
    1,
    '',
    'Tableau de bord',
    '/dashboard',
    null,
    'dashboard',
    null,
    false,
    0
  ),
  new Menu(
    6,
    '',
    'Utilisateurs',
    '/parametres/utilisateurs',
    null,
    'manage_accounts',
    null,
    false,
    18
  ),

  new Menu(
    7,
    '',
    'Configuration',
    '/parametres/configurations',
    null,
    'settings',
    null,
    false,
    18
  ),
  new Menu(9, '', 'Demandes', '/demandes', null, 'settings', null, false, 0),
  new Menu(
    10,
    '',
    'Détenteurs',
    '/détenteurs',
    null,
    'settings',
    null,
    false,
    0
  ),
  new Menu(
    11,
    '',
    'Organismes',
    '/organismes',
    null,
    'settings',
    null,
    false,
    0
  ),
  new Menu(
    12,
    '',
    'Verification',
    '/verification',
    null,
    'settings',
    null,
    true,
    0
  ),
  new Menu(
    13,
    '',
    'Historique de vérification',
    '/verification/historique',
    null,
    'settings',
    null,
    false,
    12
  ),
  new Menu(
    20,
    '',
    'Verifier une Licence',
    '/verification/licence',
    null,
    'settings',
    null,
    false,
    12
  ),

  new Menu(14, '', 'Formations', '/formation', null, 'settings', null, true, 0),
  new Menu(
    15,
    '',
    'Historique formation',
    '/formations/historique',
    null,
    'apartment',
    null,
    false,
    14
  ),
  new Menu(
    16,
    '',
    'Rappels',
    '/formations/rappels',
    null,
    'apartment',
    null,
    false,
    14
  ),
  new Menu(
    17,
    '',
    'Plan de Formation',
    '/formations/plan',
    null,
    'apartment',
    null,
    false,
    14
  ),
  new Menu(19, '', 'Rapports', '/rapports', null, 'settings', null, false, 0),
  new Menu(
    18,
    '',
    'Paramètres',
    '/parametres',
    null,
    'settings',
    null,
    true,
    0
  ),
];

export const horizontalMenuItems = [
  new Menu(
    1,
    '',
    'Tableau de bord',
    '/dashboard',
    null,
    'dashboard',
    null,
    false,
    0
  ),
  new Menu(
    2,
    '',
    'Users',
    '/users',
    null,
    'supervisor_account',
    null,
    false,
    0
  ),
  new Menu(3, '', 'UI Features', null, null, 'computer', null, true, 0),
  new Menu(4, '', 'Buttons', '/ui/buttons', null, 'keyboard', null, false, 3),
  new Menu(
    5,
    '',
    'Cards',
    '/ui/cards',
    null,
    'card_membership',
    null,
    false,
    3
  ),
  new Menu(6, '', 'Lists', '/ui/lists', null, 'list', null, false, 3),
  new Menu(7, '', 'Grids', '/ui/grids', null, 'grid_on', null, false, 3),
  new Menu(8, '', 'Tabs', '/ui/tabs', null, 'tab', null, false, 3),
  new Menu(
    9,
    '',
    'Expansion Panel',
    '/ui/expansion-panel',
    null,
    'dns',
    null,
    false,
    3
  ),
  new Menu(10, '', 'Chips', '/ui/chips', null, 'label', null, false, 3),
  new Menu(
    11,
    '',
    'Progress',
    '/ui/progress',
    null,
    'data_usage',
    null,
    false,
    3
  ),
];
export const userAppMenu = [
  new Menu(1, '', 'Mes Demandes', '/mesdemandes', null, '', null, false, 0),
  new Menu(2, '', 'Mes licences', '/meslicences', null, '', null, false, 0),
  new Menu(3, '', 'Mes Formation', '/mesFormation', null, '', null, false, 0),
];
