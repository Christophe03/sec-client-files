import { Component, NgZone, OnInit, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  getDoc,
  getDocs,
  where,
  query,
  addDoc,
  setDoc,
} from '@angular/fire/firestore';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SocieteModel } from 'src/app/@common/models/societes.model';
import { Users } from 'src/app/@common/models/users';
import { ConstanteService } from 'src/app/@common/services/constante.service';
import { DashboardService } from 'src/app/@common/services/dashboard.service';
import { LocalStorageService } from 'src/app/@common/services/local-storage.service';
import { LoginService } from 'src/app/@common/services/login.service';
import { NotificationService } from 'src/app/@common/services/notification.service';
import { DashboardWrapper } from 'src/app/@common/wrappers/dashbord.wrapper';
import { projectOption } from 'src/environments/project-option';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  alertesData: any[] = [];
  dossiersoData: any[] = [];
  user: Users;
  model: DashboardWrapper;
  alerts: any[] = [];
  constructor(
    private dashboardService: DashboardService,
    protected loginService: LoginService,
    private notificationService: NotificationService,
    private translate: TranslateService,
    protected localStorageService: LocalStorageService,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.model = new DashboardWrapper();
    this.user = JSON.parse(
      this.localStorageService.getInLocalStorage(projectOption.userKey)
    );
    this.loadAlerts();
    // this.dashboardService.findAlertes().subscribe(
    //   (data) => {
    //     this.alertesData = ConstanteService.getDatas(data);
    //   },
    //   (error) => {
    //     this.showError(error);
    //   }
    // );
    // this.dashboardService.findDossiers(this.user.id).subscribe(
    //   (data) => {
    //     this.dossiersoData = ConstanteService.getDatas(data);
    //   },
    //   (error) => {
    //     this.showError(error);
    //   }
    // );
  }

  //   ngAfterViewInit() {
  //     this.zone.runOutsideAngular(() => {
  //       this.createCaChart();
  //       this.createActivitesChart();
  //     });
  //   }

  loadAlerts() {
    this.alerts = [];
    this.alerts.push({});

    // let w: ActiviteWrapper = new ActiviteWrapper();
    // this.alerts = [];
    // w.nature = "E";
    // w.datedebut = this.pipe.transform(addDays(new Date(), -7), "yyyy-MM-dd");
    // w.datefin = this.pipe.transform(addDays(new Date(), 7), "yyyy-MM-dd");
    // this.sActivite.search(w).subscribe((data) => {
    //   this.alerts = ConstanteService.getDatas(data);
    // });
  }
  createCaChart() {
    // const chart = am4core.create('caChartdiv', am4charts.XYChart3D);
    // chart.colors.list = [am4core.color('#2776BD'), am4core.color('#ff2d2d')];
    // this.dashboardService.findCa().subscribe(
    //   (data) => {
    //     const list = ConstanteService.getDatas(data);
    //     chart.data = !list ? [] : list;
    //     // Create axes
    //     let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    //     categoryAxis.dataFields.category = 'category';
    //     // categoryAxis.title.text = "Countries";
    //     let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    //     // valueAxis.title.text = "Litres sold (M)";
    //     // Create series
    //     let series = chart.series.push(new am4charts.ColumnSeries3D());
    //     series.dataFields.valueY = 'axe1';
    //     series.dataFields.categoryX = 'category';
    //     series.name = this.translate.instant('ca');
    //     series.tooltipText = '{name}: [bold]{valueY}[/]';
    //     // var series2 = chart.series.push(new am4charts.ColumnSeries3D());
    //     // series2.dataFields.valueY = "axe2";
    //     // series2.dataFields.categoryX = "category";
    //     // series2.name = this.translate.instant("charges");
    //     // series2.tooltipText = "{name}: [bold]{valueY}[/]";
    //     // Add cursor
    //     chart.cursor = new am4charts.XYCursor();
    //   },
    //   (error) => {
    //     this.showError(error);
    //   }
    // );
  }

  createActivitesChart() {
    // let chart = am4core.create('activiteChargdiv', am4charts.PieChart);
    // chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
    // this.dashboardService.findActivites().subscribe(
    //   (data) => {
    //     const list = ConstanteService.getDatas(data);
    //     chart.data = !list ? [] : list;

    //     chart.radius = am4core.percent(70);
    //     chart.innerRadius = am4core.percent(40);
    //     chart.startAngle = 180;
    //     chart.endAngle = 360;
    //     //chart.showTooltip = false;

    //     let series = chart.series.push(new am4charts.PieSeries());
    //     series.colors.list = [
    //       am4core.color('#0d47a1'),
    //       am4core.color('#ff2d2d'),
    //     ];
    //     series.dataFields.value = 'value';
    //     series.dataFields.category = 'category';

    //     series.slices.template.cornerRadius = 10;
    //     series.slices.template.innerCornerRadius = 7;
    //     series.slices.template.draggable = false;
    //     series.slices.template.inert = true;
    //     series.alignLabels = true;

    //pour caher le labels en fonctiondu pourcentage.
    // series.ticks.template.events.on("ready", hideSmall);
    // series.ticks.template.events.on("visibilitychanged", hideSmall);
    // series.labels.template.events.on("ready", hideSmall);
    // series.labels.template.events.on("visibilitychanged", hideSmall);

    // function hideSmall(ev) {
    //   if (ev.target.dataItem.values.value.percent < 5) {
    //     ev.target.hide();
    //   } else {
    //     ev.target.show();
    //   }
    // }
    // series.hiddenState.properties.startAngle = 90;
    // series.hiddenState.properties.endAngle = 90;
    // series.labels.template.fontSize = 8;
    // series.labels.template.text =
    //   "{category}: {value.percent.formatNumber('###.00')}%";
    // series.slices.template.tooltipText =
    //   "{category}: {value.percent.formatNumber('###.00')}% ({value.value})";

    //chart.legend = new am4charts.Legend();
    // },
    (error) => {
      this.showError(error);
    };
    // );
  }
  showError(error): void {
    this.notificationService.open(
      'error',
      ConstanteService.getErrorMessage(error),
      ''
    );
  }
}
