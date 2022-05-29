import { Component, OnInit } from '@angular/core';
import { ThemeGetterService } from '../services/theme-getter.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
