import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public saveInLocalStorage(key: string, value): void {
    localStorage.setItem(key, value);
  }

  public getInLocalStorage(key: string): any {
    return localStorage.getItem(key);
  }

  public removeInLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }

  public saveInSessionStorage(key: string, value): void {
    sessionStorage.setItem(key, value);
  }

  public getInSessionStorage(key: string): any {
    return sessionStorage.getItem(key);
  }
}
