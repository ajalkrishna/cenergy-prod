import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-energy-page',
  templateUrl: './energy-page.component.html',
  styleUrls: ['./energy-page.component.scss']
})
export class EnergyPageComponent implements OnInit {

  showTip:boolean=true;

  constructor() { }

  ngOnInit(): void {
  }

  hideTip(){
    this.showTip=false;
  }

}
