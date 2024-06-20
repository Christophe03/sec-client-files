import { Injectable, inject } from '@angular/core';
import { Users } from '../models/users';
import { LoginService } from './login.service';
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
import { catchError, from, map, mergeMap, of } from 'rxjs';
import { DossiersModel } from '../models/dossiers.model';
import { SocieteModel } from '../models/societes.model';
import { FichiersModel } from '../models/fichiers.model';

@Injectable({
  providedIn: 'root',
})
export class TacheService {
  private firestore: Firestore = inject(Firestore);
  user: Users;

  private collectionName: string;
  constructor(private loginService: LoginService) {
    this.collectionName = 'societes';
    this.loginService.account.subscribe((data) => {
      this.user = data;
      console.log(this.user);
    });
  }

  async loadSocieteWithFileToTraie() {
    // methode qui va voir en fonction des socitété de l'itilisateur ceux qui ont non_traite > 0
    const codes = this.user.societes;
    if (codes == null || codes.length == 0) {
      return [];
    }

    const dosq = query(
      collection(this.firestore, this.collectionName),
      where('code', 'in', codes),
      where('non_traite', '>', 0)
      // where('capital', '==', true)
    );

    const dosQuerySnapshot = await getDocs(dosq);
    const listDos = dosQuerySnapshot.docs.map((doc) => {
      const dossier = JSON.parse(JSON.stringify(doc.data()));
      // dossier.id = doc.id;
      return dossier as SocieteModel;
    });
    return listDos;

    // const chunkSize = 10; // Firestore 'in' queries can handle up to 10 items
    // const chunks = this.chunkArray(codes, chunkSize);

    // // Create observables for each chunk
    // const observables = chunks.map((chunk) => {
    //   const q = query(
    //     collection(this.firestore, this.collectionName),
    //     where('code', 'in', chunk),
    //     where('nom_traite', '>', 0)
    //   );
    //   return from(getDocs(q)).pipe(
    //     map((querySnapshot) => querySnapshot.docs.map((doc) => doc.data()))
    //   );
    // });

    // return from(Promise.all(observables)).pipe(
    //   mergeMap(results => results), // Merge the arrays emitted by each observable
    //   catchError(error => {
    //     console.error('Error combining observables:', error);
    //     return of([]); // Retourne une liste vide en cas d'erreur
    //   })

    // // Combine all observables into one
    // // return from(Promise.all(observables)).pipe(
    // //   map((results: any[]) => {
    // //     // Flatten the array of arrays into a single array
    // //     console.log(results);
    // //     return [].concat(...results);
    // //   })
    // // );
  }

  async loadFichierNonTraiteParSociete(path): Promise<FichiersModel[]> {
    // méthode qui vas charger les fichiers non traité d'une société

    // Pour le nombre
    // let untreatedCount = 0;

    // // Récupérer les documents dans le chemin donné
    // const pathCollection = collection(this.firestore, path);
    // const pathSnapshot = await getDocs(pathCollection);

    // for (const doc of pathSnapshot.docs) {
    //   // Compter les documents non traités dans la sous-collection "fichiers"
    //   const fichiersCollection = collection(
    //     this.firestore,
    //     `${path}/${doc.id}/fichiers`
    //   );
    //   const fichiersQuery = query(
    //     fichiersCollection,
    //     where('traite', '==', false)
    //   );
    //   const fichiersSnapshot = await getDocs(fichiersQuery);
    //   untreatedCount += fichiersSnapshot.size;

    //   // Récupérer et compter récursivement les sous-collections "sousDossiers"
    //   const sousDossiersPath = `${path}/${doc.id}/sousDossiers`;
    //   untreatedCount += await this.loadFichierNonTraiteParSociete(
    //     sousDossiersPath
    //   );
    // }

    // return untreatedCount;

    let untreatedFiles: FichiersModel[] = [];

    // Récupérer les documents dans le chemin donné
    const pathCollection = collection(this.firestore, path);
    const pathSnapshot = await getDocs(pathCollection);

    for (const doc of pathSnapshot.docs) {
      // Récupérer les documents non traités dans la sous-collection "fichiers"
      const fichiersCollection = collection(
        this.firestore,
        `${path}/${doc.id}/fichiers`
      );
      const fichiersQuery = query(
        fichiersCollection,
        where('traite', '==', false)
      );
      const fichiersSnapshot = await getDocs(fichiersQuery);

      fichiersSnapshot.forEach((fichierDoc) => {
        untreatedFiles.push(fichierDoc.data() as FichiersModel);
      });

      // Récupérer récursivement les sous-collections "sousDossiers"
      const sousDossiersPath = `${path}/${doc.id}/sousDossiers`;
      const files = await this.loadFichierNonTraiteParSociete(sousDossiersPath);
      untreatedFiles = untreatedFiles.concat(files);
    }

    return untreatedFiles;
  }

  getZoneDepotLink(societe) {
    // Méthode pour retourner le lien initiale de la zone de depot du client
    return 'societes/' + societe.code + '/dossiers/99/sousDossiers';
  }

  private chunkArray(array: any[], size: number): any[][] {
    // méthode qui vas diviser la liste en morceau en fonction du size qu'on donne en paramètre
    const chunkedArray = [];
    for (let i = 0; i < array.length; i += size) {
      chunkedArray.push(array.slice(i, i + size));
    }
    return chunkedArray;
  }
}
