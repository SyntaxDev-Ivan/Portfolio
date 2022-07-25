import { Component, Input, OnInit } from '@angular/core';
import WeatherDataType from '../types/weatherDataType';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})

export class WeatherComponent implements OnInit {
  //--

  @Input() weatherData: WeatherDataType;
  //--

  constructor() {
  }

  ngOnInit(): void {
  }

}
