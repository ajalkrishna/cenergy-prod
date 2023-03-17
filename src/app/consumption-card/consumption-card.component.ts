import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consumption-card',
  templateUrl: './consumption-card.component.html',
  styleUrls: ['./consumption-card.component.scss']
})
export class ConsumptionCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  dataToBeDisplayed=[
    {
      heading:'Last 30 Days Consumption',
      value:'58kwh'

    },
    {
      heading:'Last 7 Days Consumption',
      value:'12kWh'

    },
    {
      heading:'Last 1 Day Consumption',
      value:'236Wh'
    },

  ]

}
