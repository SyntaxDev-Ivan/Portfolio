import { Injectable } from '@angular/core';
import { Observer } from 'rxjs';
import { Observable } from 'rxjs';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeGetterService {
  currentTheme = '#F97119'
  observer: any = undefined

  constructor(private lss: LocalStorageService) {
    if (this.lss.checkItemExists("theme")) {
      this.currentTheme = this.lss.getItem("theme").replace('"', '')
    }
    this.currentTheme = this.currentTheme.replace('"', '')
  }

  getTheme(): Observable<string> {
    //live update für den Theme
    return new Observable(observer => {
      observer.next(this.currentTheme)
      this.observer = observer
    })
  }

  setTheme(c: string) {
    this.currentTheme = c
    this.lss.setItem("theme", c)
    this.observer.next(this.currentTheme)
  }
}
