import { Injectable, NgZone } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  retry,
  throwError,
} from 'rxjs';
import { inject } from '@angular/core';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytesResumable,
} from '@angular/fire/storage';
import { LoginService } from 'src/app/@common/services/login.service';
import { Users } from 'src/app/@common/models/users';

@Injectable({
  providedIn: 'root',
})
export class DeposerService {
  private ngZone: NgZone = inject(NgZone);
  private firestore: Firestore = inject(Firestore);
  private storage = inject(Storage);
  private currentUser: Users;
  private collectionName = 'societes';

  // public filesHolder$: BehaviorSubject<File[]> = new BehaviorSubject([]);

  public filesHolder$ = new BehaviorSubject<
    {
      file: File;
      progress$: Observable<number>;
    }[]
  >([]);
  public filesTransferHolder$ = new BehaviorSubject<
    {
      file: File;
      isUploaded: boolean;
      transfered: number;
      totalb: number;
      error?: boolean; // pas utiliser pour l'instant mais l'idée serai de l'utiliser en modifiant legèrement la fonction qui enregistre sur le storage et la fonction qui enregistre sur le firestore pourqu'ils retournent des promise au quel on suscrirait pour s'assurer des enregistrement qu'on veut faire, et si les enregistrement ne sont pas fait on passe cette valeur à false et on gèrera l'affichage des potentielles erreurs sur le dioalog en question dans le html ou en affichant une notification qu'on vas afficher( c'est un peu long mais je voulais perdre l'idée ;) )
    }[]
  >([]);
  constructor(private loginService: LoginService) {
    this.loginService.account.subscribe((data) => {
      this.currentUser = data;
    });
  }

  // addFiles(files: FileList) {
  //   this.filesHolder$.next([
  //     ...this.filesHolder$.value,
  //     ...Array.from(files).map((f: File) => {
  //       return {
  //         file: f,
  //         progress$: this.uploadFile(f),
  //       };
  //     }),
  //   ]);
  // }

  addFiles(files: FileList) {
    const newFiles = Array.from(files).map((f: File) => {
      return {
        file: f,
        progress$: null,
        isUploaded: false,
        transfered: 0,
        totalb: 0,
        // progress$: this.uploadFile(f),
      };
    });
    this.filesHolder$.next([...this.filesHolder$.value, ...newFiles]);
  }

  async addFileToDossier(
    file: File,
    url: string,
    lienFile: string,
    dossierId: string
  ) {
    // On vas construire notre document fichier
    const createur = JSON.stringify(this.currentUser);
    const dateUpload = new Date().getTime();
    const lien = url;
    const nom = this.getFileNameWithoutExtension(file.name); // nom du fichier sans l'extension
    const taille = this.getReadableFileSizeString(file.size);
    const typeFichier = file.name.split('.')[file.name.split('.').length - 1];
    const code = this.generateUUID(file.lastModified, dateUpload);

    const dr = doc(
      this.firestore,
      this.collectionName,
      dossierId,
      lienFile,
      code
    );
    await setDoc(dr, {
      code: code,
      createur: createur,
      dateUpload: dateUpload,
      lien: lien,
      nom: nom,
      taille: taille,
      typeFichier: typeFichier,
      typeDepot: 'SEC',
    });

    // const docRef =
  }

  uploadFile(file: File, lien: any, dossierId: string): Observable<number> {
    return new Observable<number>((observer) => {
      const filePath = `depotSec/${dossierId}/${file.name}`;
      const storageRef = ref(this.storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Calculer la progression du téléchargement
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.ngZone.run(() => {
            observer.next(Math.floor(progress));
            this.updateFileProgress(
              file,
              snapshot.bytesTransferred,
              snapshot.totalBytes
            );
          });
        },
        (error) => {
          // Gérer les erreurs+
          console.log(error);
          this.ngZone.run(() => {
            observer.error(error);
          });
        },
        () => {
          // Téléchargement terminé avec succès
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // console.log('File available at', downloadURL);
            // On doit maintenant enregistrer le fichier dans le firestore
            await this.addFileToDossier(file, downloadURL, lien, dossierId);
            this.ngZone.run(() => {
              observer.complete();
              this.markFileAsUploaded(file);
            });
          });
        }
      );
    }).pipe(
      retry(3), // Retry up to 3 times in case of error
      catchError((error) => {
        console.error('Upload failed', error);
        return throwError(error);
      })
    );
  }

  private markFileAsUploaded(file: File) {
    const files = this.filesTransferHolder$.value.map((f) => {
      if (f.file === file) {
        return { ...f, isUploaded: true };
      }
      return f;
    });
    this.ngZone.run(() => {
      this.filesTransferHolder$.next(files);
    });
  }

  private updateFileProgress(file: File, transfered: number, totalb: number) {
    const files = this.filesTransferHolder$.value.map((f) => {
      if (f.file === file) {
        return { ...f, transfered: transfered, totalb: totalb };
      }
      return f;
    });
    this.filesTransferHolder$.next(files);
  }

  areAllFilesUploaded(): boolean {
    if (this.filesTransferHolder$.value.length > 0)
      return this.filesTransferHolder$.value.every((f) => f.isUploaded);
    return false;
  }

  getTotalProgress(): number {
    const files = this.filesTransferHolder$.value;
    if (files.length === 0) {
      return 0;
    }
    const totalTransfered = files.reduce(
      (sum, file) => sum + file.transfered,
      0
    );
    const totalTotalb = files.reduce((sum, file) => sum + file.totalb, 0);
    if (totalTransfered > 0 && totalTotalb > 0) {
      return Math.floor((totalTransfered / totalTotalb) * 100);
    }
    return 0;
  }

  showFiles(repertoire: any, dossierId: string) {
    const curentHolder = this.filesHolder$.value.map((f) => {
      return {
        file: f.file,
        progress$: this.uploadFile(f.file, repertoire.lienFiles, dossierId),
      };
    });
    const curentProgress = this.filesHolder$.value.map((f) => {
      return {
        file: f.file,
        isUploaded: false,
        transfered: 0,
        totalb: 0,
      };
    });
    // );
    // this.filesHolder$.value.map
    this.filesHolder$.next(curentHolder);
    this.filesTransferHolder$.next(curentProgress);
  }
  public removeFile(index: number) {
    const files = this.filesHolder$.value.slice();
    files.splice(index, 1);
    this.filesHolder$.next(files);
  }

  getReadableFileSizeString(fileSize: number): string {
    let size = fileSize;
    let unit = 'bytes';

    if (size >= 1024) {
      size /= 1024;
      unit = 'KB';
    }

    if (size >= 1024) {
      size /= 1024;
      unit = 'MB';
    }

    if (size >= 1024) {
      size /= 1024;
      unit = 'GB';
    }

    return `${size.toFixed(2)} ${unit}`;
  }

  getFileNameWithoutExtension(fileName: string): string {
    return fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
  }
  generateUUID(lastModified: number, dateUpload: number): string {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
      .replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      })
      .concat('-' + lastModified + '', '-', dateUpload + '');
  }

  initService() {
    this.filesHolder$.next([]);
    this.filesTransferHolder$.next([]);
  }
}
