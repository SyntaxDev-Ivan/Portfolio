import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  get(key: string): any {
    return localStorage.getItem(key)
  }

  save(key: string, value: string): void {
    localStorage.setItem(key, value)
  }

  delete(key: string) {
    localStorage.removeItem(key)
  }

  clear() {
    localStorage.clear()
  }
}
