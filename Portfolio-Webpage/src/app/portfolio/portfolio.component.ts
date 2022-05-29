import { Component, OnInit } from '@angular/core';
import { ThemeGetterService } from '../services/theme-getter.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

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
