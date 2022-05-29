import { Component, OnInit } from '@angular/core';
import { ThemeGetterService } from '../services/theme-getter.service';

@Component({
  selector: 'app-ich',
  templateUrl: './ich.component.html',
  styleUrls: ['./ich.component.scss']
})
export class IchComponent implements OnInit {

  currentTheme = ''

  constructor(private themeGetter: ThemeGetterService) { }

  ngOnInit(): void {
    this.listenToThemeChange()
  }

  listenToThemeChange() {
    this.themeGetter.getTheme().subscribe(theme => {
      this.currentTheme = theme
    });
  }

}
