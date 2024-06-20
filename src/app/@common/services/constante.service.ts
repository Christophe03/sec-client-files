import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";



@Injectable({
  providedIn: "root",
})
export class ConstanteService {
  public static NATURE_DOC_ATTESTATIONS = "attestations";
  public static NATURE_DOC_FACTURES = "factures";
  public static NATURE_DOC_CONTRATS = "contrats";
  public static NATURE_DOC_OFFRES = "offres";

  public static baseOption() {
    const _headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return { headers: _headers };
  }
  public static baseOptionBlob() {
    const _headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
    return { headers: _headers, responseType: "blob" as "json" };
  }

  public static getErrorMessage(error): string {

    // console.log(error)
    if (error.status === 400) {
      if (error.error.message) {
        // console.log(error.error.message[0])
        return error.error.message[0];
      }
      return "oups.erreur.survenue";
    }
    if (error.status === 900) {
      return "Téléchargement impossible, Fichier introuvable!";
    }
    if (error.status === 401 || error.status === 403) {
      return "Problème de sécurité, verifiez que vous avez les droits necessaires";
    }
    if (error.status === 500) {
      return "Veuillez vous identifier pour continuer.";
    } else if (error.status >= 400 && error.status < 500) {
      return error.error;
    } else {
      return error.error && error.error.status >= 500
        ? error.error.message
        : "Oups ! Une erreur est survenue.";
    }
  }

  public static getDatas(data): any[] | any {
    return data !== null && data.hasOwnProperty("content")
      ? data.content
      : data;
  }
  public static getTotalElements(data): number {
    return !data
      ? 0
      : data.hasOwnProperty("totalElements")
        ? data.totalElements
        : data.hasOwnProperty("length")
          ? data.length
          : 0;
  }

  public static getOwnProperty(data, property?) {
    if (!data || !property) {
      return data;
    }
    return data.hasOwnProperty(property) ? data[property] : data;
  }

  public static checkReturn(response) {
    if (response !== null) return true;
    return (
      response === null ||
      response.hasOwnProperty("id") ||
      response.hasOwnProperty("code") ||
      (response.hasOwnProperty("status") && response.status === "OK")
    );
  }


}
