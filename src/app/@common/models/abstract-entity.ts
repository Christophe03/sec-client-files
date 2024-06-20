import { EtatEntite } from './etat.entite';
export abstract class AbstractEntity {

    id: number;
    createdBy: string;
    lastModifiedBy: string;
    createdDate: any;
    lastModifiedDate: any;
    etat: EtatEntite;

    deserialize(input: any) {
        return Object.assign(this, input);
    }

    
}
