import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    return localStorage.getItem(key);
  }

  checkItemExists(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }
}
