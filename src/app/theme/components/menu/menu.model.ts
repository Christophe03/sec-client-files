export class Menu {
  constructor(
    public id: number,
    public code: string,
    public title: string,
    public routerLink: string,
    public href: string,
    public icon: string,
    public target: string,
    public hasSubMenu: boolean,
    public parentId: number,
    public actions?: string
  ) {}
}
