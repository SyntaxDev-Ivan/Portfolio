import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Portfolio-Webpage';

  ngClasses = {
    home: {
      active: false
    },
    portfolio: {
      active: false
    },
    ich: {
      active: false
    }
  }

  constructor(private router: Router) {

  }

  ngOnInit() {
    switch (this.router.url) {
      case '/':
        this.router.navigate(['/home'])
        this.deactivateActiveElements()
        this.ngClasses.home.active = true
        break
      case '/portfolio':
        this.deactivateActiveElements()
        this.ngClasses.portfolio.active = true
        break
      case '/ich':
        this.deactivateActiveElements()
        this.ngClasses.ich.active = true
        break
      default:
        this.deactivateActiveElements()

    }
  }

  deactivateActiveElements(): void {
    this.ngClasses.home.active = false
    this.ngClasses.portfolio.active = false
    this.ngClasses.ich.active = false
  }

  redirectToGithub() {
    window.open('https://github.com/ivopacak/Portfolio', '_blank')
  }
}
