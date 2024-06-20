import { Clients } from "../models/clients";
import { Dossiers } from "../models/dossiers";
import { Echeanciers } from "../models/echeanciers";
import { Scelles } from "../models/scelles";
import { Societes } from "../models/societes";
import { TypeDossiers } from "../models/type-dossiers";


export class GlobalWrapper {
    client: Clients;
    dossier: Dossiers;
    scelle: Scelles;
    echeanciers: Echeanciers[];
    echeancier: Echeanciers
    societe: Societes
    typeDossier: TypeDossiers;
}

