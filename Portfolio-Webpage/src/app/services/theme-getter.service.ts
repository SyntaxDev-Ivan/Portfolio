import { Injectable } from '@angular/core';
import { Observer } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeGetterService {
  currentTheme = '#F97119'
  observer: any = undefined
  constructor() { }

  getTheme(): Observable<string> {
    //live update für den Theme
    return new Observable(observer => {
      observer.next(this.currentTheme)
      this.observer = observer
    })
  }

  setTheme(c: string) {
    this.currentTheme = c
    this.observer.next(this.currentTheme)
  }

}
