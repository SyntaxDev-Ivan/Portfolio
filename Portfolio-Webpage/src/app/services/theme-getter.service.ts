import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeGetterService {
  currentTheme = '#F97119'
  constructor() { }

  getTheme(): Observable<string> {
    //live update für den Theme
    return new Observable(observer => {
      observer.next(this.currentTheme)
    })
  }

  setTheme(c: string) {
    this.currentTheme = c
  }

}
