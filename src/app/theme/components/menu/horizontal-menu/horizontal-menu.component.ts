import {
  Component,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { NavigationEnd, Router } from '@angular/router';
import { AppSettings } from '../../../../app.settings';
import { Settings } from '../../../../app.settings.model';
import { MenuService } from '../menu.service';
import { LoginService } from 'src/app/@common/services/login.service';

@Component({
  selector: 'app-horizontal-menu',
  templateUrl: './horizontal-menu.component.html',
  styleUrls: ['./horizontal-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [MenuService],
})
export class HorizontalMenuComponent implements OnInit {
  @Input() menuParentId;
  public menuItems: Array<any>;
  public settings: Settings;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  public username: string = 'admin';

  constructor(
    public appSettings: AppSettings,
    public menuService: MenuService,
    private loginService: LoginService,
    public router: Router
  ) {
    this.settings = this.appSettings.settings;
    this.loginService.role.subscribe((data) => {
      this.username = data;
    });
  }

  ngOnInit() {
    if (this.username === 'admin')
      this.menuItems = this.menuService.getMaillonAppMenuItems();
    else {
      this.menuItems = this.menuService.getUserItems();
    }

    this.menuItems = this.menuItems.filter(
      (item) => item.parentId == this.menuParentId
    );
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
}
