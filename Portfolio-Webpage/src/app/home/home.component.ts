import { Component, OnInit } from '@angular/core';
import { ThemeGetterService } from '../services/theme-getter.service';
import TypeWriter from 't-writer.js'
import hljs from 'highlight.js'
import { Router } from '@angular/router';

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

  code = `
  async function bubbleSort(arr) {
    canRun = false
    //Zeitliche Komplexität O(n^2)
    //und insertion sort: O(n)
    let temp;
    //Von hinten vom array durchgehen
    for (var i = arr.length; i > 0; i--) {
        //Von vorne vom array durchgehen
        for (var j = 0; j < i; j++) {
            //Vergleichen
            if (arr[j] > arr[j + 1]) {
                temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
                //Warte 5ms, damit die visualisierung zu sehen ist und nicht sofort alles sortiert ist
                await sleep()
                //Zeige den atuellen Diagramm
                showBars(arr)
                //Visualisiere die grünen bars, wo wir gerade sind
                visualisation(j, "green")
                visualisation(j + 1, "green")
                //und die lilanen bis wo es geht
                for (var k = i - 1; k < i; k++) {
                    visualisation(k, "purple")
                }
                for (var e = 0; e < j; e++) {
                //und die roten, wo wir schon waren
                    visualisation(e, "red")
                }
            }
        }
    }
    //Ab jetzt kann ein Neuer algorithmus gestartet werden
    canRun = true

    //Zeige entgültig alle bars an!
    showBars(arr)

}

async function inserationSort(arr) {
    canRun = false
        //Diese Art von Sortierverfahren ist viel schneller als Bubblesort. 
        //Sie vergleicht auch paarweise, aber unterscheidet zwischen der bereits sortierten Hälfte
        //und der unsortierten hälfte und ist durchaus für etwas größere Arrays geeignet.
        //(n^2) / 4 

    for (var i = 0; i < arr.length; i++) {
        //Den array ab der 2 stelle durchgehen da 1 schon in der "sortierten" Hälfte ist.


        let j = i
        let needToBeSorted = arr[j + 1]

        while (needToBeSorted < arr[j]) {
            await sleep()
            if (needToBeSorted < arr[j]) {

                let temp = arr[j]
                arr[j] = needToBeSorted
                arr[j + 1] = temp
                showBars(arr)

                visualisation(i + 1, "green")
            }

            j--

            needToBeSorted = arr[j + 1]
        }

        if (i == arr.length) {
            canRun = true
        }
    }
    //Ab jetzt kann ein Neuer algorithmus gestartet werden
    canRun = true
    console.log(canRun)
}
    `



  constructor(private themeGetter: ThemeGetterService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    await this.sleep(10)

    hljs.initHighlightingOnLoad()
    this.listenToThemeChange()
    this.animateText()
  }

  async sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  animateText() {
    //delete and insert element, make sure its not running twice
    let target = document.querySelector(this.targetClassForTw)
    target?.remove()

    let targetParent = document.querySelector('span') as HTMLElement
    targetParent.innerHTML += `<b class="tw-target-ivan"></b>`

    //Typewriter libary animation
    target = document.querySelector(this.targetClassForTw)
    let tw = new TypeWriter(target, this.twOptions)

    tw.type('Ivan').rest(1600).clear().changeTypeColor(this.currentTheme)
      .changeCursorColor(this.currentTheme).type('Ivan').rest(1600).clear()
      .changeTypeColor('#fff').changeCursorColor('#fff').start()
  }

  listenToThemeChange() {
    this.themeGetter.getTheme().subscribe(theme => {
      this.currentTheme = theme
    });
  }

  goTo(component: string) {
    let element = document.getElementById(component) as HTMLElement
    element.click()
  }
}
