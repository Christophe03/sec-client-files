import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Users } from 'src/app/@common/models/users';
import { CommonService } from 'src/app/@common/services/common.service';
import { LocalStorageService } from 'src/app/@common/services/local-storage.service';
import { LoginService } from 'src/app/@common/services/login.service';
import { projectOption } from 'src/environments/project-option';
import { AppSettings } from '../../../app.settings';
import { Settings } from '../../../app.settings.model';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  encapsulation: ViewEncapsulation.None,
  // providers: [MenuService],
})
export class SidenavComponent implements OnInit {
  public userImage: any =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAAyCAYAAAB1V8bkAAAFOUlEQVR4nO3dT2gUZxgG8LfFQ5pDsJCAe7QYtJhasCChpCGEVuwaK1UaW5AqKvWgWIKklYSKGBokwUhEDxYVvdiag8Uat2IvmoYS0tQSTQ4loVIvySESwT/dW8vzMu8wzq4zsxubmv2eH4Td7M5+3zdjnu/fLPjST5nMP0JEJe1l/vMSlT4GncgBDDqRAxh0Igcw6EQOYNCJHMCgEzmAQSdyAINO5AAGncgBDDqRAxh0Igcw6EQOYNCJHMCgEzmAQSdyAINO5AAGncgBDDqRAxbxH7lwv46MyC9DQ9KfyehnU0uWyIb16+WjzZsX1okU6b10Wj/YfuCANNTXL8AzcA+DXoBsNiunTp/2A26mpqfl4aNHL/4JkLMY9AJcuXrVDzlGs9o1a6SsrEw7gNnZ2QVyFuQiBj2h2QcP5JszZ/Tg8JQVYU+lUvp8ampKfrx+XW7cvKkjPab1Hzc3S3rdOv94m/oe6+6W4ZER+fbiRXmjpkZ2bNsmNStX5j3Gyvts505dJqDOcF3wyZYt8v7atX574upCJ7Vh0yY9BmXb8qP3xAnt1Orr6uSrtraCr9eNgQH5ob9f7oyN+degsaFB223Gxsfl+8uXZWBwUOvGrAjtC1/fJGVRNG7GJTQ5OekfiJE8Cv5Y31q9WprSaQ3gsePH9Y81rKW1VY8F/BF3HT2qHUoQjkEgqpct01fR2XT39PhHBOtCCPD7l+3tGuBwOfnqQlgQMvFmLMZmLu/U1eW0O87Z8+fl6yNHZGZmRtsFuAZY9pg/797VNiHk6HhQt7UvKElZFI9BT+jxkyf+gVEjCUbSvgsX5PO9e/XHQoQRKQyj5ZVLl+TUyZP6DjqFYIcC+OPu6erSURUjHSAcCH+4rl6vA0A5CHNQVF3oKOw1zBIQQvPmqlU57Y6Cz1tgv9i/X9uFR/E6D7wv3igNCDnOrzfQeZmkZVE8Tt2LgNEyKuwIUHBXXrxRNAyjJcp5belS/51ghyKhoGE6i9ENZu7f9+u6Mz7+1PQ9XzlRdeE1BA5t/H10VMrLy/V1dDKvLl6c0+4of0xM+O/aMsQexXsfHZQF+IOmJn3MV0/SsigeR/SElldX+wcODQ8/80OZa9ek7eBB+e3WLWnZt8+fbv4XrC6EHOt2G/GLYYFDu0dv39bnb9fW/k9Xm543Bj0hjBwWWoyqmHraOlh33b219Xd9ffq4Y/t23YCztXWxLHQSmO6K1/EE68ImWtzeQRT7LJYFNhPBKF+oYIdo7Q23W7ylBPw8OKiP4b0JKaAsisepewE+3bpV/rp3T6e4NoU2tmNdWVmpU+iz585pSMP33AuFz6NOTG0HvFDoxlsqlVMXjiuWbcrZnQU8j1qeiNfhBa8D2mX7EigH7wWvAV63qfaHGzfq+eCno7NTJkJ7E+J1rknKongc0QuAsHUePqxT5PrAbjRGvqqqKn3e2tKi7yGACN5cptPi3S7DutR2p1He7l27curClPvdxsY5LRVeX7HCf24bdMVAh4d2or12iw6/B785iHPCtcQxODfcMssnSVkUj/9t8gtqvr9miuUHbtshdDYyz0edNmvATv/uPXv0Oe4MBDcNae44dScN2aGODv8LPs3zMFraF3UwQldUVPhTcvzOkD9/DDrJK/iW3fS0To+xHJiPte/f2awuS/B9AMwiEHDcApzLhiI9G6fupDCqcyQtXdyMI8WQlzYGncgBDDqRAxh0Igcw6EQOYNCJHMCgEzmAQSdyAINO5AAGncgBDDqRAxh0Igcw6EQOYNCJHMCgE5U6EfkXjsGWiBQh/+MAAAAASUVORK5CYII=';
  public settings: Settings;
  public user: Users;


  constructor(
    public appSettings: AppSettings,
    protected loginService: LoginService,
    protected translateService: TranslateService,
    protected localStorageService: LocalStorageService,
    public cService: CommonService
  ) {
    this.settings = this.appSettings.settings;
    //this.societe.raisonSociale = ' ';
  }

  ngOnInit() {

    this.user = JSON.parse(
      this.localStorageService.getInLocalStorage(projectOption.userKey)
    );
  }

  // getImageFromService() {
  //     this.cService.getPhoto(this.user.employe.photo, 2, this.user.employe.structureId).subscribe(data => {
  //         if (data.size > 0) {
  //             this.createImageFromBlob(data);
  //         } else {
  //             this.userImage = '../assets/img/users/user.jpg';
  //         }

  //     }, error => {
  //         console.log(error);
  //     });
  // }
  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.userImage = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }
  public closeSubMenus() {
    const menu = document.getElementById('vertical-menu');
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
  onLogout() {
  }
}
