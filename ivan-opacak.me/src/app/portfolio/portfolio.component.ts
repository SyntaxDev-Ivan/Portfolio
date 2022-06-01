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
    this.scrollToTop()
  }

  scrollToTop() {
    window.scrollTo(0, 0)
  }

  listenToThemeChange() {
    this.themeGetter.getTheme().subscribe(theme => {
      this.currentTheme = theme
    });
  }

  open(url: any) {
    window.open(url, '_blank');
  }
}
