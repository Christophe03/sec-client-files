import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  NavigationEnd,
  Router,
  UrlSegment,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent {
  public backLink: string;
  public pageTitle: string;
  public breadcrumbs: {
    name: string;
    url: string;
  }[] = [];

  public settings: Settings;

  constructor(
    public appSettings: AppSettings,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    protected translate: TranslateService,
    public title: Title
  ) {
    this.settings = this.appSettings.settings;
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.breadcrumbs = [];
        this.parseRoute(this.router.routerState.snapshot.root);
        this.pageTitle = '';
        this.breadcrumbs.forEach((breadcrumb) => {
          this.pageTitle += ' > ' + this.translate.instant(breadcrumb.name);
        });
        //this.title.setTitle(this.settings.name + this.translate.instant(this.pageTitle));
      }
    });
  }

  private parseRoute(node: ActivatedRouteSnapshot) {
    if (node.data['backLink']) {
      this.backLink = node.data['backLink'];
    }
    if (node.data['breadcrumb']) {
      if (node.url.length) {
        let urlSegments: UrlSegment[] = [];
        node.pathFromRoot.forEach((routerState) => {
          urlSegments = urlSegments.concat(routerState.url);
        });
        const url = urlSegments
          .map((urlSegment) => {
            return urlSegment.path;
          })
          .join('/');
        this.breadcrumbs.push({
          name: node.data['breadcrumb'],
          url: '/' + url,
        });
      }
    }
    if (node.firstChild) {
      this.parseRoute(node.firstChild);
    }
  }

  public closeSubMenus() {
    const menu = document.querySelector('.sidenav-menu-outer');
    if (menu) {
      for (let i = 0; i < menu.children[0].children.length; i++) {
        const child = menu.children[0].children[i];
        if (child) {
          if (child.children[0].classList.contains('expanded')) {
            child.children[0].classList.remove('expanded');
            child.children[1].classList.remove('show');
          }
        }
      }
    }
  }
  // back() {

  //   this.router.navigateByUrl(this.breadcrumbs[0].url + '/' + this.backLink);
  //   this.backLink = '';
  // }

  back() {
    console.log(this.breadcrumbs);
    if (this.backLink != 'misBack') {
      this.router.navigateByUrl(this.breadcrumbs[0].url + '/' + this.backLink, {
        // skipLocationChange: true,
      });
    } else {
      if (this.breadcrumbs.length > 1) {
        this.router.navigateByUrl(
          this.breadcrumbs[this.breadcrumbs.length - 2].url
          // { skipLocationChange: true }
        );
      }

      if (this.breadcrumbs.length <= 1) {
        this.router.navigateByUrl(
          this.breadcrumbs[this.breadcrumbs.length - 1].url
          // { skipLocationChange: true }
        );
      }
    }
    this.backLink = '';
  }
}
