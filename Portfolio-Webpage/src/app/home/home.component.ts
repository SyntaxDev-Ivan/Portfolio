import { Component, OnInit } from '@angular/core';
import { ThemeGetterService } from '../services/theme-getter.service';
import TypeWriter from 't-writer.js'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  currentTheme = ''

  targetClassForTw = '.tw-target-ivan'
  twOptions = {
    loop: true,
    typeColor: '#fff',
    cursorColor: '#fff',
    typeSpeed: 200,
    deleteSpeed: 100
  }

  constructor(private themeGetter: ThemeGetterService) { }

  ngOnInit(): void {
    this.listenToThemeChange()
    this.animateText()
  }

  animateText() {
    //Typewriter libary animation
    const target = document.querySelector(this.targetClassForTw)
    const tw = new TypeWriter(target, this.twOptions)
    tw.type('Ivan').rest(1600).clear().changeTypeColor(this.currentTheme)
      .changeCursorColor(this.currentTheme).type('Ivan').rest(1600).clear()
      .changeTypeColor('#fff').changeCursorColor('#fff').start()
  }

  listenToThemeChange() {
    this.themeGetter.getTheme().subscribe(theme => {
      this.currentTheme = theme
    });
  }

}
