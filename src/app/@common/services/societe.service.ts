import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
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
import { SocieteModel } from '../models/societes.model';
import { LoginService } from './login.service';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root',
})
export class SocieteService {
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

  public async findByUserSocietes(societeIds: string[]) {
    console.log(societeIds);
    const societeList: SocieteModel[] = [];
    if (societeIds != null && societeIds.length > 0) {
      for (const id of societeIds) {
        const docSnapshot = await getDoc(
          doc(this.firestore, this.collectionName, id)
        );
        if (docSnapshot.data() != null) {
          const societe = JSON.parse(JSON.stringify(docSnapshot.data()));
          societe.id = docSnapshot.id;
          societeList.push(societe as SocieteModel);
        }
      }
    }
    return societeList;
  }

  public async find(id: string) {
    const snapshot = await getDoc(doc(this.firestore, this.collectionName, id));
    return snapshot.data() == null
      ? null
      : { ...snapshot.data(), id: snapshot.id };
  }

  public async findAll() {
    // Methode pour retourner la liste des sociétés
    //Liste des documents
    const q = query(
      collection(this.firestore, this.collectionName)
      // where('capital', '==', true)
    );
    const querySnapshot = await getDocs(q);
    const list = querySnapshot.docs.map((doc) => {
      const societe = JSON.parse(JSON.stringify(doc.data()));
      societe.id = doc.id;
      return societe as SocieteModel;
    });
    // console.log(list);
    return list;
  }

  public async findAllArchitectureDossierForSociete() {
    const docSnapshot = await getDoc(doc(this.firestore, 'config', 'dossiers')); // récuperer le document dossiers dans la collection config
    return docSnapshot.data()!.sousCollection; // je rétourne l'attribut array sousCollection
  }
  async add(societe: SocieteModel, archi: string) {
    // On va enregistrer la societé et récuperer en même temps son id
    const docRef = await addDoc(collection(this.firestore, 'societes'), {
      adresse: societe.adresse,
      bp: societe.bp,
      email: societe.email,
      nif: societe.nif,
      raisonSocial: societe.raisonSocial,
      rccm: societe.rccm,
      responsable: societe.responsable,
      sigle: societe.sigle,
      telephone: societe.telephone,
    });

    // Mise à jour du document avec l'ID généré
    await setDoc(docRef, { code: docRef.id }, { merge: true });

    const q = query(collection(this.firestore, `config/dossiers/${archi}`));
    const querySnapshot = await getDocs(q);
    querySnapshot.docs.forEach(async (docu) => {
      // Pour chaque dossier
      // On vas ajouter le dossier à la société
      const dr = doc(this.firestore, `${docRef.path}`, 'dossiers', docu.id);
      await setDoc(dr, {
        nomfr: docu.data()['nomfr'],
        nomen: docu.data()['nomen'],
        code: docu.data()['code'],
        public: docu.data()['public'],
        createur: this.user.name,
      });
      // on vas ensuite enregistrer les sous dossiers du dossier
      // On récupère d'abord les sous dossier
      const q2 = query(
        collection(this.firestore, `${docu.ref.path}/sousDossiers`)
      );
      const q2S = await getDocs(q2);
      // console.log(q2S.docs);
      // console.log(q2S.empty);
      q2S.forEach(async (element) => {
        //Pour chaque sous dossier, on enregistre le sous dossier au dossier du dossier de la société
        const dsr = await setDoc(
          doc(this.firestore, `${dr.path}`, 'sousDossiers', element.id),
          {
            nomfr: element.data()['nomfr'],
            nomen: element.data()['nomen'],
            code: element.data()['code'],
            public: docu.data()['public'],
            createur: this.user.name,
          }
        );
        console.log(element.id, ' => ', element.data());
      });
    });
    return docRef.id;
  }
}
