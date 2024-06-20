import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  ViewChild,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DeposerService } from './deposer.service';
import { NotificationService } from 'src/app/@common/services/notification.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmDialogComponent } from 'src/app/theme/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-deposer-dialog',
  // standalone: true,
  // imports: [],
  templateUrl: './deposer-dialog.component.html',
  styleUrl: './deposer-dialog.component.scss',
})
export class DeposerDialogComponent {
  nbligne: number = 20;
  public over = false;
  // public filesHolder$: Observable<File[]> =
  //   this.depotService.filesHolder$.asObservable();

  public filesHolder$: Observable<
    { file: File; progress$: Observable<number> }[]
  > = this.depotService.filesHolder$.asObservable();

  public filesTransferHolder$: Observable<
    { file: File; isUploaded: boolean; transfered: number; totalb: number }[]
  > = this.depotService.filesTransferHolder$.asObservable();

  @ViewChild('fileinput', { static: true }) inputRef!: ElementRef;

  allUploaded = false;
  isLoading = false;
  totalProgress = 0;
  repertoire: any; // c'est n réalité un type RepertoireListModel
  dossierId: string;
  constructor(
    protected translate: TranslateService,
    private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<DeposerDialogComponent>,
    private depotService: DeposerService,
    private cdr: ChangeDetectorRef,
    private notificationService: NotificationService
  ) {
    this.repertoire = data.repertoire;
    this.dossierId = data.dossierId;
    console.log(data);
    this.filesTransferHolder$.subscribe(() => {
      this.checkAllUploaded();
      this.calculateTotalProgress();
    });
  }

  private checkAllUploaded() {
    this.allUploaded = this.depotService.areAllFilesUploaded();

    if (this.allUploaded) {
      // Afficher un message et fermer la boite de dialog avec true
      this.notificationService.open('succes', 'Depot effectué avec succès', '');
      setTimeout(() => {
        this.dialogRef.close(true);
      }, 1000);
    }
  }

  private calculateTotalProgress() {
    this.totalProgress = this.depotService.getTotalProgress();
    this.cdr.markForCheck();
  }
  openFile() {
    this.inputRef.nativeElement.click();
  }
  addFiles($event: Event) {
    const files = ($event.target as HTMLInputElement).files;
    if (files) {
      this.depotService.addFiles(files);
    }
  }

  removeFile(index: number) {
    this.depotService.removeFile(index);
  }
  dropFile($event: DragEvent) {
    if ($event.dataTransfer) {
      const files = $event.dataTransfer.files;
      this.depotService.addFiles(files);
    }
  }

  save() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = false;
    (dialogConfig.width = '500px'),
      (dialogConfig.data = {
        message: this.translate.instant('Voulez vous deposer ces document ?'),
      });
    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.isLoading = true;
        this.depotService.showFiles(this.repertoire, this.dossierId);
      }
    });
    // this.isLoading = true;
    // this.depotService.showFiles(this.repertoire, this.dossierId);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
