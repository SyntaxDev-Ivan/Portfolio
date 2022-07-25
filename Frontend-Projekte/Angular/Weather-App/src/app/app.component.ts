import { Component } from '@angular/core';
import weatherData from './types/weatherDataType';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Weather-App';
  weatherPredictions: Array<weatherData> = [
    {
      date: "1. Juli 2022",
      times: [
        {
          calcius: "20°",
          status: "Bewölkt",
          time: "14:00"
        }, {
          calcius: "22°",
          status: "Sonnig",
          time: "16:00"
        }

      ]
    },
    {
      date: "2. Juli 2022",
      times: [
        {
          calcius: "20°",
          status: "bewölkt",
          time: "15:00"
        }
      ]
    }
  ]

}
