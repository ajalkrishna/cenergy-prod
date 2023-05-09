import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tariff',
  templateUrl: './tariff.component.html',
  styleUrls: ['./tariff.component.scss']
})
export class TariffComponent implements OnInit {

  constructor() { }

  meterData:any[]=[
    {
      title:"Grid to Home",
      reading:"130kWh"
    },
    {
      title:"Home to Grid",
      reading:"230kWh"
    },
    {
      title:"Net Reading",
      reading:"100kWh"
    }
    // {
    //   title:"Type of Tariff",
    //   reading:"Fixed"
    // }
  ]

  ngOnInit(): void {
  }

}
