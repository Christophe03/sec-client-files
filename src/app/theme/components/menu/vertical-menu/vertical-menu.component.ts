import { Location } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Users } from 'src/app/@common/models/users';
import { ConstanteService } from 'src/app/@common/services/constante.service';
import { LocalStorageService } from 'src/app/@common/services/local-storage.service';
import { LoginService } from 'src/app/@common/services/login.service';
import { AppSettings } from 'src/app/app.settings';
import { Settings } from 'src/app/app.settings.model';
import { Menu } from '../menu.model';

@Component({
  selector: 'app-vertical-menu',
  templateUrl: './vertical-menu.component.html',
  styleUrls: ['./vertical-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class VerticalMenuComponent implements OnInit {
  public menuItems: Menu[] = [];
  @Input() menuParentId;
  @Input('menuSub') sub;
  @Output() onClickMenuItem: EventEmitter<any> = new EventEmitter<any>();
  public parentMenu: Array<any>;
  public settings: Settings;
  user: Users;
  constructor(
    public appSettings: AppSettings,
    protected translate: TranslateService,
    protected loginService: LoginService,
    private localStorageService: LocalStorageService,
    private location: Location,
    public router: Router
  ) {
    this.user = new Users();
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {
    this.loginService.account.subscribe((data) => {
      this.user = data;

      // if (this.user.id) {
      //   this.loginService.appmenus(this.user.id).subscribe({
      //     next: (data) => {
      //       try {
      //         this.menuItems = ConstanteService.getDatas(data);
      //         if (this.menuItems) {
      //           this.parentMenu = this.menuItems.filter(
      //             (item) => item.parentId == this.menuParentId
      //           );
      //         }
      //       } catch (error) {
      //         console.log(error);
      //       }
      //     },
      //     error: (e) => {
      //       console.log(e);
      //     },
      //     complete: () => {
      //       // console.log('done');
      //     },
      //   });
      // }
    });
    if (this.menuItems) {
      this.parentMenu = this.menuItems.filter(
        (item) => item.parentId == this.menuParentId
      );
    }
  }

  ngAfterViewInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.settings.fixedHeader) {
          const mainContent = document.getElementById('main-content');
          if (mainContent) {
            mainContent.scrollTop = 0;
          }
        } else {
          document.getElementsByClassName(
            'mat-drawer-content'
          )[0].scrollTop = 0;
        }
      }
    });
  }

  onClick(menuId) {
    this.toggleMenuItem(menuId);
    this.closeOtherSubMenus(this.menuItems, menuId);
    this.onClickMenuItem.emit(menuId);
  }

  public expandActiveSubMenu(menu: Array<Menu>) {
    const url = this.location.path();
    const routerLink = url; // url.substring(1, url.length);
    const activeMenuItem = menu.filter(
      (item) => item.routerLink === routerLink
    );
    if (activeMenuItem[0]) {
      let menuItem = activeMenuItem[0];
      while (menuItem.parentId != 0) {
        const parentMenuItem = menu.filter(
          (item) => item.id == menuItem.parentId
        )[0];
        menuItem = parentMenuItem;
        this.toggleMenuItem(menuItem.id);
      }
    }
  }

  public toggleMenuItem(menuId) {
    const menuItem = document.getElementById('menu-item-' + menuId);
    const subMenu = document.getElementById('sub-menu-' + menuId);

    if (subMenu) {
      const icon = document.getElementById('sub-menu-icon' + menuId);
      if (subMenu.classList.contains('show')) {
        subMenu.classList.remove('show');
        menuItem.classList.remove('expanded');
        icon.classList.remove('rotat');
      } else {
        subMenu.classList.add('show');
        menuItem.classList.add('expanded');
        icon.classList.add('rotat');
      }
    }
  }

  public closeOtherSubMenus(menu: Array<Menu>, menuId) {
    const currentMenuItem = menu.filter((item) => item.id == menuId)[0];
    if (currentMenuItem.parentId == 0 && !currentMenuItem.target) {
      menu.forEach((item) => {
        if (item.id != menuId) {
          const subMenu = document.getElementById('sub-menu-' + item.id);
          const menuItem = document.getElementById('menu-item-' + item.id);
          if (subMenu) {
            if (subMenu.classList.contains('show')) {
              subMenu.classList.remove('show');
              menuItem.classList.remove('expanded');
            }
          }
        }
      });
    }
  }
}
