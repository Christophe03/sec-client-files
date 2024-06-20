import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { Menu } from 'src/app/theme/components/menu/menu.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ApplicationsComponent implements OnInit {
  menuItems: Menu[] = [];
  constructor(protected translate: TranslateService) {}

  ngOnInit() {
    // this.loginService.getMenusApplications().subscribe(
    //   (data) => {
    //     let tab: Menu[] = ConstanteService.getDatas(data);
    //     tab
    //       .filter((f) => f.title !== "app.portail")
    //       .forEach((m) => {
    //         this.menuItems.push(
    //           new Menu(
    //             m.id,
    //             this.translate.instant(m.title),
    //             m.routerLink,
    //             m.href,
    //             m.icon,
    //             null,
    //             m.hasSubMenu,
    //             m.parentId
    //           )
    //         );
    //       });
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }
  open() {
    // window.open('/');
    if (environment.production) {
      //window.open('http://localhost:90/portail/');
      window.location.href = 'http://localhost:90/portail/';
    } else {
      //window.open('http://localhost:9090', '_blank');
      window.location.href = 'http://localhost:9090';
    }
  }
}
