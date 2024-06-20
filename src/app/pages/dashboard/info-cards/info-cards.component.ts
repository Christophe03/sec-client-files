import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AppSettings } from 'src/app/app.settings';
import { Settings } from '../../../app.settings.model';
import { DashboardWrapper } from 'src/app/@common/wrappers/dashbord.wrapper';
@Component({
  selector: 'app-info-cards',
  // standalone: true,
  // imports: [],
  templateUrl: './info-cards.component.html',
  styleUrl: './info-cards.component.scss',
})
export class InfoCardsComponent {
  @Input()
  model: DashboardWrapper;
  public colorScheme = {
    domain: ['#999'],
  };
  public autoScale = true;
  @ViewChild('resizedDiv') resizedDiv: ElementRef;
  public previousWidthOfResizedDiv: number = 0;
  public settings: Settings;

  constructor(public appSettings: AppSettings, private router: Router) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit() {}

  public onSelect(event) {
    console.log(event);
  }

  ngOnDestroy() {}

  ngAfterViewChecked() {
    if (
      this.previousWidthOfResizedDiv !=
      this.resizedDiv.nativeElement.clientWidth
    ) {
    }
    this.previousWidthOfResizedDiv = this.resizedDiv.nativeElement.clientWidth;
  }
  showDemandes() {
    this.router.navigateByUrl('/demandes/recrutement');
  }
}
